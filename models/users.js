const mongoose = require("mongoose")
const  passportLocalMongoose = require("passport-local-mongoose");


// username and password are added automatically

var userSchema = new mongoose.Schema({

  roles:[{type: String, required: false}]
});

// this add some new methods to our userschema
// register let the user be added with appropriate encryption of the
// password etc.

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)
module.exports = { User };