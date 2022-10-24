const mongoose = require("mongoose")
const  passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
//extras go here
});

// query do I need the above since passportLocalMongoose adds them anyway???
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)
module.exports = { User };