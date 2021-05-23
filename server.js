const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.MONGO_URI.replace(
  '<password>',
  process.env.DATABSE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Database Connection successfully!!'));
