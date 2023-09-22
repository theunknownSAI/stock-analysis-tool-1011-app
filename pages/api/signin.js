
const bcrypt = require("bcrypt");
import connectToMongo from "../../utils/connectMongo";


async function run(email, password) {
  try {
    const {client, db} = await connectToMongo();
    console.log("Connected correctly to server");

    const col = await db.collection("userdetails");
    let present = await col.findOne({ email: email });
    let status = "";

    if (present == null) {
      status = "account doesnt exists";
      present = {};
    } else {
      const passwordHash = present.password;
      const success = await bcrypt.compare(password, passwordHash);
      if (success) {
        status = "login success";
      } else {
        status = "invalid credentials";
        present = {};
      }
    }
    return [status, present];
  } catch (err) {
    // await client.close();
    console.log(err.stack);
    return ["error", {}];
  }
}

export default async (req, res, next) => {
  try {
    const email = req.query["email"];
    const password = req.query["password"];
    await run(email, password)
      .then((status) => {
        res.send({ status: status[0], details: status[1] });
      })
      .catch((e) => {
        console.log(e);
        res.send({ status: "error" });
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ created: "error" });
  }
};
