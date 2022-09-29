
const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/web2_2022'

mongoose
.connect(connectionString,
{"useNewURLParser":true,
"useUnifiedTopology": true})
.catch (error => {
    console.log(`Dataabase connection refused ${error}`);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});