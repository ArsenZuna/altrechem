const jwt = require('jsonwebtoken');

/**
 * Generate a JWT containing user ID and role
 * @param {string} userId  MongoDB _id of the user
 * @param {string} role    User role (e.g. 'client' or 'admin')
 * @returns {string}       Signed JWT
 */
function generateToken(userId, role) {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

module.exports = generateToken;
