const bcrypt = require("bcrypt");
import connectToMongo from "../../utils/connectMongo";

export const config = {
  api: {
    externalResolver: true,
  },
};

async function run(email, password, firstName, lastName) {

  let message = "";
  let statusCode = 200;

  try {
    const { db } = await connectToMongo();
    const col = db.collection("userdetails");

    let passwordHash = "";

    await bcrypt.hash(password, 10).then(async (hash) => {
      passwordHash = hash;
    });

    let personDocument = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    };
    const document = await col.findOne({ email: email });
    if (document == null) {
      await col.insertOne(personDocument);
      message = "Account Created Successfully";
      statusCode = 200;
    } else {
      message = "Account Already Exists";
      statusCode = 404
    }
  } catch (err) {
    console.log(err.stack);
    message = "Account Creation Error";
    statusCode = 500;
  }

  return { message, statusCode };
}

export default async (req, res, next) => {
  try {
    const email = req.query["email"];
    const password = req.query["password"];
    const firstName = req.query["firstName"];
    const lastName = req.query["lastName"];
    await run(email, password, firstName, lastName)
      .then((response) => {
        res.status(response.statusCode).send({ message: response.message });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send({ message: "Account Creation Error" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Account Creation Error" });
  }
};
