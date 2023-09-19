const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
secret = process.env.TOKEN_SECRET;

const generateToken = (payload) => {
    console.log(payload);
    console.log(secret);
  // Créez le JWT en utilisant la fonction sign() de jsonwebtoken
  const token = jwt.sign(payload, secret, { expiresIn: '12h' });
  
  return token;
};

module.exports = generateToken;