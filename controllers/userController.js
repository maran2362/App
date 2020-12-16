//Init User Object
const User = require('../models/User')

exports.login = function(req,res){
    let user = new User(req.body)
    user.login( function(result){
        res.send(result)
    })
    
}
exports.logout = function(){
    
}
exports.register = function(req,res){
    //Intantiate a user
    let user = new User(req.body)
    user.register()
    user.validate()
    if(user.errors.length){
        res.send(user.errors)
    }else{
        res.send("There is no errors")
    }
    
    
}
exports.home = function(req, res){
    res.render('home-guest')
}

exports.about = function(req, res){
    res.send("Thank you for visiting about us")
}
