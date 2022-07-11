const jwt = require("jsonwebtoken");


exports.login = async (req, res, next) => {
  let isPasswordValid = false;
  try {
    const existedUser = await req.db.collection("users").findOne({ email });

    if (existedUser) {
      isPasswordValid = await compare(password, existedUser.password);
    }
    if (!existedUser || !isPasswordValid)
      throw new Error("Invalid credentials");

    const oldToken = await db.collection("token").findOne({ email });

    //to create a token
    const token = jwt.sign(
      { email, role: users.role },
      process.env.SECRET /*,{expiresIn: "1hr"}*/
    );

    // save user in db
    if (oldToken) {
      let updatetedUser = await db
        .collection("token")
        .updateOne({ token: oldToken.token }, { $set: { token } });
    } else {
      await db.collection("token").insertOne({ email, token });
    }

    return { sucess: true, messsge: "Logged in sucessfully", token };
  } catch (error) {
    throw error;
  }
};