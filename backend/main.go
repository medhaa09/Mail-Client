package main

import (
	"backend/Auth"
	"backend/models"
	"backend/store"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors" // Use gin-contrib/cors, not rs/cors
	"github.com/gin-gonic/gin"
)

func main() {
	mongoStore := &store.MongoStore{}
	mongoStore.OpenConnectionWithMongoDB()
	// Server (using gin framework)
	router := gin.Default()
	// Configure CORS middleware
	config := cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(config))

	protected := router.Group("/")
	protected.Use(cors.New(config))
	protected.Use(Auth.TokenAuthMiddleware())

	router.POST("/Signup", func(c *gin.Context) {
		var newUser models.User
		if err := c.ShouldBindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := mongoStore.StoreUserData(newUser); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store user data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
	})

	router.POST("/login", func(c *gin.Context) {
		var loginCredentials models.User
		err := c.ShouldBindJSON(&loginCredentials)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		isAuthenticated := mongoStore.UserLogin(loginCredentials.Email, loginCredentials.Password)
		if isAuthenticated {
			c.JSON(http.StatusOK, gin.H{"message": "successful login"})
			signedToken, signedRefreshToken, err := Auth.GenerateAllTokens(loginCredentials.Email)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate tokens"})
				return
			}
			c.JSON(http.StatusOK, gin.H{"token": signedToken, "refreshToken": signedRefreshToken})
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid Credentials"})
		}
	})

	router.GET("/fetch-emails", func(c *gin.Context) {
		// Fetch emails from the provided API
		response, err := http.Get("https://flipkart-email-mock.now.sh")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch emails from API"})
			fmt.Println(err)
			return
		}
		defer response.Body.Close()
		fmt.Println(response)
		var emailList models.EmailList
		err = json.NewDecoder(response.Body).Decode(&emailList)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response body"})
			return
		}

		for _, email := range emailList.List {
			err = mongoStore.StoreEmail(email)
			fmt.Println(email)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store emails in MongoDB"})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"message": "Emails fetched and stored successfully"})
	})

	router.GET("/get-emails", func(c *gin.Context) {
		// Fetch emails from MongoDB
		emails, err := mongoStore.GetEmails()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch emails from MongoDB"})
			return
		}

		c.JSON(http.StatusOK, emails)
	})

	port := ":8080"
	fmt.Printf("Server running on port %s\n", port)
	if err := router.Run(port); err != nil {
		fmt.Printf("Failed to start server: %s\n", err)
	}
}
