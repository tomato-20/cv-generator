const jwt = require("jsonwebtoken");
const responseHelper = require("../../helpers/responseHelper");
const { compare } = require("./helpers/compare-password");

exports.login = async (req, res, next) => {
  let isPasswordValid = false;
  const { email, password } = req.body;
  try {
    const existedUser = await req.db.collection("users").findOne({ email });

    if (existedUser) {
      isPasswordValid = await compare(password, existedUser.password);
    }
    if (!existedUser || !isPasswordValid)
      return responseHelper.errorResponse(res, "Invalid credentials");

    const oldToken = await req.db.collection("token").findOne({ userId : existedUser._id });

    //to create a token
    const token = jwt.sign({ id: existedUser._id }, process.env.TOKEN_SECRET);

    // save user in db
    if (oldToken) {
      let updatedUser = await req.db
        .collection("token")
        .updateOne({ token: oldToken.token }, { $set: { token } });
      return responseHelper.successResponse(res, "User logged in", { token });

    } else {  
      await req.db.collection("token").insertOne({ userId : existedUser._id, token });
      return responseHelper.successResponse(res, "User logged in", { token })

  } }
  catch (error) {
    return responseHelper.errorResponse(res.err.message || "Login unsucessfull");
  }
};
