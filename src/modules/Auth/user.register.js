const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");
const responseHelper = require("../../helpers/responseHelper");
const {prepareInsertData} = require("./helpers/data-process.db.helper");

const checkInsert = (user)=>{
    try {
        return !!user?.insertedId
    } catch (error) {
        throw error;
    }
}

//register user
exports.createUser = async (req, res, next) => {
    try {
        const {Fullname, Email, Password, Phone, Address} = req.body;
         
        //to validate
        if(!(Fullname && Email && Password && Phone && Address)) {
            
            return responseHelper.errorResponse(res, "Input is required!!", 400)
        }

        //to check if user already exist in db
        const oldUser = await req.db.collection("users").findOne({Email});
        if (oldUser) {
            return  responseHelper.errorResponse(res, "User already exist. Please Login!!", 400)
        }

        //to generate hass password
        encryptedPassword = await bcrypt.hash(Password, 10);

        const userPreparedInsertData = prepareInsertData({data:req.body, encryptedPassword, userId:null})
        //to save user in db
        const userDbInsertResponse = await req.db.collection("users").insertOne(userPreparedInsertData);

        if(checkInsert(userDbInsertResponse)){
            return responseHelper.sucessResponse(res, "User registered sucessfully")
        }
        return responseHelper.sucessResponse(res,  "User registration failed")

    } catch (error) {
        console.log(error)
    }
}