const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/app.config");

const resHelper = require("../helpers/responseHelper");

module.exports = (req, res, next) => {
  try {
    let token =
      req.headers["authorization"] ||
      req.headers["Authorization"] ||
      req.query.token;

    if (!token) return resHelper.errorResponse(res, "Token is required", 401);

    let decoded = jwt.verify(token, TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name == "JsonWebTokenError" ||
      error.name == "TokenExpiredError"
    ) {
      return resHelper.errorResponse(
        res,

        error.message || "Invalid Token",

        401
      );
    }

    next(error);
  }
};
