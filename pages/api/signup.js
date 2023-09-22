const bcrypt = require("bcrypt");
import connectToMongo from "../../utils/connectMongo";

async function run(email, password, firstName, lastName) {
  try {
    const {client, db} = await connectToMongo();
    const col = db.collection("userdetails");
    let passwordHash = "";
    await bcrypt.hash(password, 10).then(async (hash) => {
      passwordHash = hash;
    });
    // Construct a document
    let personDocument = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    };
    // Find if already present document
    const present = await col.findOne({ email: email });
    let status = "";
    if (present == null) {
      // Insert a single document, wait for promise so we can read it back
      const p = await col.insertOne(personDocument);
      status = "account created successfully";
    } else {
      status = "account already exists";
    }
    // await client.close();
    return status;
  } catch (err) {
    console.log(err.stack);

    return "account creation error";
  }
}

export default async (req, res, next) => {
  try {
    const email = req.query["email"];
    const password = req.query["password"];
    const firstName = req.query["firstName"];
    const lastName = req.query["lastName"];
    await run(email, password, firstName, lastName)
      .then((status) => {
        res.send({ status: status });
      })
      .catch((e) => {
        console.log(e);
        res.send({ status: "account creation error" });
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: "account creation error" });
  }
};
