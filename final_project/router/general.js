const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    let promise = new Promise((resolve, reject) => {

        try{

            let result = JSON.stringify(books, null, 4);
            resolve(result);

        } catch(error){

            reject(error);

        }

    });

    promise.then(
        (result) => res.send(result),
        (error) => res.send("Error finding books.")
    )

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    let promise = new Promise((resolve, reject) => {
        let isbn = req.params.isbn;

        try{

            let result = books[parseInt(isbn)];
            resolve(result);

        } catch (error){

            reject(error);

        }

    });

    promise.then(
        (result) => res.send(result),
        (error) => res.send("Error finding book.")
    )

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    let promise = new Promise((resolve, reject) => {

        try{

            let author = req.params.author;
            let result = {};
            for (const key in books){
                if(books[key]["author"] === author){
                    result = books[key];
                    break;
                }
            }
            resolve(result);

        } catch(error){

            reject(error);

        }

    });

    promise.then(

        (result) => res.send(result),
        (error) => res.send("Error finding author.")
    )
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let result = {};
  for (const key in books){
    if(books[key]["title"] === title){
        result = books[key];
        break;
    }
  }
  res.send(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if (books[isbn]){
    res.send(books[isbn]["reviews"]);
  } else{
    res.send({"message":"Book doesn`t exist!"});
  }
});

module.exports.general = public_users;
