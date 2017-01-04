package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"golang.org/x/oauth2"

	"github.com/antonholmquist/jason"
)

// AccessToken ...
type AccessToken struct {
	Token  string
	Expiry int64
}

// TODO: set up config for production/dev environments.
// currently using dev fb secrets and dev url.

func readHTTPBody(response *http.Response) string {

	fmt.Println("Reading body")

	bodyBuffer := make([]byte, 5000)
	var str string

	count, err := response.Body.Read(bodyBuffer)

	for ; count > 0; count, err = response.Body.Read(bodyBuffer) {

		if err != nil {

		}
		fmt.Println(string(bodyBuffer[:count]))
		str += string(bodyBuffer[:count])
	}

	return str

}

// GetAccessToken ...
func GetAccessToken(clientID string, code string, secret string, callbackURI string) AccessToken {

	response, err := http.Get("https://graph.facebook.com/oauth/access_token?client_id=" +
		clientID + "&redirect_uri=" + callbackURI +
		"&client_secret=" + secret + "&code=" + code)

	if err == nil {

		auth := readHTTPBody(response)

		var token AccessToken

		tokenArr := strings.Split(auth, "&")
		fmt.Println("Get Access Token")
		token.Token = strings.Split(tokenArr[0], "=")[1]
		expireInt, err := strconv.Atoi(strings.Split(tokenArr[1], "=")[1])

		if err == nil {
			token.Expiry = int64(expireInt)
		}

		return token
	}

	var token AccessToken

	return token
}

// HandleLogin /login before user logs in with fb
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	// generate loginURL
	fbConfig := &oauth2.Config{
		ClientID:     "125509244616445",
		ClientSecret: "61f1129cbc048b34f758b19db2494166",
		RedirectURL:  "http://localhost:5000/profile",
		Scopes:       []string{"email", "user_birthday", "user_location", "user_about_me"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://www.facebook.com/dialog/oauth",
			TokenURL: "https://graph.facebook.com/oauth/access_token",
		},
	}

	url := fbConfig.AuthCodeURL("")

	// Home page will display a button for login to Facebook

	w.Write([]byte("<html><title>Golang Login Facebook Example</title> <body> <a href='" + url + "'><button>Login with Facebook!</button> </a> </body></html>"))
}

// HandleProfile /profile after user logs in with fb
func HandleProfile(w http.ResponseWriter, r *http.Request) {
	// grab the code fragment

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	code := r.FormValue("code")

	ClientID := "125509244616445"
	ClientSecret := "61f1129cbc048b34f758b19db2494166"
	RedirectURL := "http://localhost:5000/profile"

	accessToken := GetAccessToken(ClientID, code, ClientSecret, RedirectURL)

	response, err := http.Get("https://graph.facebook.com/me?access_token=" + accessToken.Token + "&fields=email")
	// handle err. You need to change this into something more robust
	// such as redirect back to home page with error message
	if err != nil {
		w.Write([]byte(err.Error()))
	} else {
		str := readHTTPBody(response)
		// dump out all the data
		// w.Write([]byte(str))

		// see https://www.socketloop.com/tutorials/golang-process-json-data-with-jason-package
		user, _ := jason.NewObjectFromBytes([]byte(str))

		email, _ := user.GetString("email")

		w.Write([]byte(fmt.Sprintf("Email is %s<br>", email)))
	}

}
