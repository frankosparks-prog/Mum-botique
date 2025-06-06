const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin'); 

dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Seeding logic
    const username = 'MCAdmin'; // Use a secure username
    const password = 'mc@1234'; // Use a secure password

    // Check if a default admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Default admin already exists');
    } else {
      // Create the default admin user
      const admin = new Admin({ username, password });
      await admin.save();
      console.log('Default admin user created:', admin);
    }
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectdb;
