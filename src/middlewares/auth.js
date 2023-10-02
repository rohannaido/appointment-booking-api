const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your own secret key

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split("Bearer ")[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
