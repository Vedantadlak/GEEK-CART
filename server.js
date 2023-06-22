const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./cart-9c010-firebase-adminsdk-h1re8-51132d2800.json'); // Replace with the path to your downloaded JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cart-9c010.firebaseio.com',
});

// Create an instance of the Express server
const app = express();
// Middleware - Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Update '*' with the appropriate origin(s) allowed to access the server
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware
app.use(express.json());

// Define your API routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Custom claim middleware
const addSellerClaim = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await admin.auth().getUserByEmail(email);

    // Set custom claim 'seller' to true for the user
    await admin.auth().setCustomUserClaims(user.uid, { seller: true });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to set custom claim' });
  }
};

// Seller signup route
app.post('/seller-signup', addSellerClaim, (req, res) => {
  try {
    // Perform necessary operations for signup

    res.status(200).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
