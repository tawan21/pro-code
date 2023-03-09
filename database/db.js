const mongoose = require('mongoose');
const mongoURI = process.env.REACT_APP_MONGO_URI;
const connectToMongo = async () => {
  const res = await mongoose.connect(mongoURI);
  console.log(res)
}

module.exports = connectToMongo;