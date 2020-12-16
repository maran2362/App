//Require DB collections
const userCollection = require('../db').collection('users')

const validator = require("validator")

//ES5 Class 
let User = function(data){
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function(){
    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}

    //Get rid of any bogus properties
    this.data = {
        username : this.data.username.trim().toLowerCase(),
        password : this.data.password.trim(),
        email : this.data.email.trim().toLowerCase()
    }
}

User.prototype.validate = function(){
    if (this.data.username == "") {this.errors.push("You must provide a username.")}
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
    if (this.data.password == "") {this.errors.push("You must provide a password.")}
    if (this.data.password.length > 0 && this.data.password.length < 12) {this.errors.push("Password must be at least 12 characters.")}
    if (this.data.password.length > 100) {this.errors.push("Password cannot exceed 100 characters.")}
    if (this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push("Username must be at least 3 characters.")}
    if (this.data.username.length > 30) {this.errors.push("Username cannot exceed 30 characters.")}

}

// User Login 
User.prototype.login = function(callback){
    this.cleanUp()
    userCollection.findOne({username:this.data.username},(err,attempedUser)=>{
        if(attempedUser && attempedUser.password == this.data.password){
            callback('Successfully login')
        }else{
            callback('Sorry Please try again')
        }
    })
}


User.prototype.register = function(){
// Step 1: Validate User data

    this.cleanUp()
    this.validate()
//Step 2: only if there are no validation error
//then save the user data into database
    if(!this.errors.length){
        userCollection.insertOne(this.data)
    }
}

module.exports = User