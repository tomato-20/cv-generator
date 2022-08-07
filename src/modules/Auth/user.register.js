const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {StatusCodes} = require('http-status-codes')
const responseHelper = require("../../helpers/responseHelper");
const { prepareInsertData } = require("./helpers/data-process.db.helper");
const uuid = require("uuid");

const checkInsert = (user) => {
  try {
    return !!user?.insertedId;
  } catch (error) {
    throw error;
  }
};

//register user
exports.createUser = async (req, res, next) => {
  try {
    const { fullname, email, password, phone, address } = req.body;

    //to validate input
    if (!(fullname && email && password && phone && address)) {
      return responseHelper.errorResponse(res, "Input is required!!", 400);
    }

    //to check if user already exist in db
    const oldUser = await req.db.collection("users").findOne({ email });
    if (oldUser) {
      return responseHelper.errorResponse(
        res,
        "User already exist. Please Login!!",
        400
      );
    }

    //to generate hass password
    encryptedPassword = await bcrypt.hash(password, 10);

    const userPreparedInsertData = prepareInsertData({
      data: req.body,
      encryptedPassword,
      userId: null,
    });
    //to save user in db
    const userDbInsertResponse = await req.db
      .collection("users")
      .insertOne(userPreparedInsertData);

    if (checkInsert(userDbInsertResponse)) {
      //creating resume table
      const userResume = await req.db.collection("user_resume").insertOne({
        userId: userPreparedInsertData._id,
        resumeId: null,
        selected: null,
      });
      return responseHelper.successResponse(res, "User registered sucessfully",'',StatusCodes.CREATED);
    }

    return responseHelper.errorResponse(res, "User registration failed");
  } catch (error) {
    console.log(error);
  }
};
