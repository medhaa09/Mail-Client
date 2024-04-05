package models

type User struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type Email struct {
	ID               string `json:"id"`
	From             Sender `json:"from"`
	Date             int64  `json:"date"`
	Subject          string `json:"subject"`
	ShortDescription string `json:"short_description"`
}

type Sender struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}

type EmailList struct {
	List []Email `json:"list"`
}
