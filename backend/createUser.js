const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
const readline = require('readline');

// Setup readline interface to take input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.log(err));

// Function to create a new admin
const createAdmin = async (name,username, password) => {
  try {
    // Check if an admin with the same email already exists
    const existingAdmin = await User.findOne({ username });

    if (existingAdmin) {
      console.log('Admin with this email already exists.');
      mongoose.disconnect();
      return;
    }

    // If admin doesn't exist, create new admin
    const user = new User({
        name:name,
      username: username,
      password: password
    });

    await user.save();
    console.log('User created');
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
};

// Prompt user for email and password
rl.question('Enter user email: ', (username) => {
  rl.question('Enter user password: ', (password) => {
    rl.question('Enter user name: ', (name) => {
    createAdmin(name,username, password);
    rl.close(); // Close the readline interface after getting input
  });
});
});