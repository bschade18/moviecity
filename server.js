const express = require('express');
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/reviews', require('./routes/review'));
app.use('/messages', require('./routes/message'));

app.use(errorHandler);

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
