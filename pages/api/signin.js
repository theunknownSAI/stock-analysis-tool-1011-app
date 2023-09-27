
const bcrypt = require("bcrypt");
import connectToMongo from "../../utils/connectMongo";

export const config = {
  api: {
    externalResolver: true,
  },
};

async function run(email, password) {

  let message = "";
  let statusCode = 200;
  let document = {};

  try {
    const { db } = await connectToMongo();
    const col = await db.collection("userdetails");
    document = await col.findOne({ email: email });

    if (document == null) {
      message = "Account Not Found";
      document = {};
      statusCode = 404;
    } else {
      const passwordHash = document.password;
      const success = await bcrypt.compare(password, passwordHash);
      if (success) {
        message = "Successfully Logged";
        statusCode = 200;
        document = document;
      } else {
        message = "Invalid Credentials";
        statusCode = 401
        document = {};
      }
    }
  } catch (error) {
    console.log(error);
    message = "Internal Server Error";
    statusCode = 500;
  }
  return { message, document, statusCode };
}

export default async (req, res, next) => {
  try {
    const email = req.query["email"];
    const password = req.query["password"];
    await run(email, password)
      .then((response) => {
        res.status(response.statusCode).send({ message: response.message, details: response.document })
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", details: {} });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", details: {} });
  }
};
