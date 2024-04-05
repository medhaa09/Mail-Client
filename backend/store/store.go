package store

import (
	"backend/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoStore struct {
	Collection1 *mongo.Collection
	Collection2 *mongo.Collection
}

const uri = "mongodb+srv://medha:drumDRO67%23%24@cluster0.qj0tdiv.mongodb.net/"

func (m *MongoStore) OpenConnectionWithMongoDB() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)
	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	// Send a ping to confirm a successful connection
	var result bson.M
	if err := client.Database("codeforces").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Decode(&result); err != nil {
		panic(err)
	}
	m.Collection1 = client.Database("Mailclient").Collection("User")
	m.Collection2 = client.Database("Mailclient").Collection("Emails")

	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}
func (m *MongoStore) StoreUserData(user models.User) error {
	fmt.Println("Trying to insert user data into MongoDB")
	_, err := m.Collection1.InsertOne(context.TODO(), user)
	if err != nil {
		fmt.Println("Error inserting user data:", err)
		return err
	}
	fmt.Println("Insertion of user data successful")
	return nil
}
func (m *MongoStore) UserLogin(email string, password string) bool {

	var foundUser models.User
	err := m.Collection1.FindOne(context.TODO(), bson.M{
		"email":    email,
		"password": password,
	}).Decode(&foundUser)

	if err != nil {
		fmt.Println("wrong credentials: ", err)
		return false
	}
	return true
}
func (m *MongoStore) StoreEmail(email models.Email) error {
	fmt.Println("Trying to insert email data into MongoDB")
	_, err := m.Collection2.InsertOne(context.TODO(), email)
	if err != nil {
		fmt.Println("Error inserting email data:", err)
		return err
	}
	fmt.Println("Insertion of email data successful")
	return nil
}

func (m *MongoStore) GetEmails() ([]models.Email, error) {
	cursor, err := m.Collection2.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var emails []models.Email
	if err := cursor.All(context.TODO(), &emails); err != nil {
		return nil, err
	}

	return emails, nil
}
