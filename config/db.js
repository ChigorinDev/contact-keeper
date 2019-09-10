const mongoose = require('mongoose');
//config allows me to get global variales from config.json
const config = require('config');
const db = config.get('mongoURI');

//connect mongoose to mongoDB and check connection
const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;
