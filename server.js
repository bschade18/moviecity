const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// needed for post and put requests
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected to database...');
});

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const reviewRouter = require('./routes/review');
const messageRouter = require('./routes/message');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/review', reviewRouter);
app.use('/message', messageRouter);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
