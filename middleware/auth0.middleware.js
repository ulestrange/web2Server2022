const { auth, InvalidTokenError, UnauthorizedError } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");

dotenv.config();

const validateAuth0AccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});


module.exports = {
  validateAuth0AccessToken
};