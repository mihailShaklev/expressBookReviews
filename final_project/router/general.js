const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    res.send(JSON.stringify(books, null, 4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  let isbn = req.params.isbn;
  res.send(books[parseInt(isbn)]);

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let result = {};
  for (const key in books){
    if(books[key]["author"] === author){
        result = books[key];
        break;
    }
  }
  res.send(result);
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
