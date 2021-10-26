require('dotenv').config()
require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const trackRouter = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
const cors = require('cors');

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: 'http://localhost:19006',
    credentials: true,
  })
);

app.use(express.json());
app.use(authRouter);
app.use(trackRouter);

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.zkick.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
