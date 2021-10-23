require('dotenv').config()
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(authRouter);

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.zkick.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
