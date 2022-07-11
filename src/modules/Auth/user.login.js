const jwt = require("jsonwebtoken");
const responseHelper = require("../../helpers/responseHelper");
const { compare } = require("./helpers/compare-password");

exports.login = async (req, res, next) => {
  let isPasswordValid = false;
  const { Email, Password} = req.body;
  try {
    const existedUser = await req.db.collection("users").findOne({ Email });

    if (existedUser) {
      isPasswordValid = await compare(Password, existedUser.Password);
    }
    if (!existedUser || !isPasswordValid)
      return responseHelper.errorResponse(res, "Invalid credentials");

    const oldToken = await req.db.collection("token").findOne({ Email });

    //to create a token
    const token = jwt.sign({ Email }, process.env.SECRET);

    // save user in db
    if (oldToken) {
      let updatetedUser = await req.db
        .collection("token")
        .updateOne({ token: oldToken.token }, { $set: { token } });
    } else {
      await req.db.collection("token").insertOne({ Email, token });

      return responseHelper.successResponse(res, "User logged in", { token });
    }
  } catch (error) {
    throw error;
  }
};
