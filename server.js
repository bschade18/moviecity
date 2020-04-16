const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const fileupload = require('express-fileupload');
const path = require('path');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// needed for post and put requests
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log('Connected to database...');
// });

// File uploading
app.use(fileupload());

// Set static folder
// again using path module, join files and folders together
// current directory and then into folder, set public as static folder
app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const reviewRouter = require('./routes/review');
const messageRouter = require('./routes/message');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/reviews', reviewRouter);
app.use('/messages', messageRouter);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
