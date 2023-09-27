const axios = require("axios");

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req, res, next) => {
  try {
    const type = req.query["type"];
    const num = parseInt(req.query["num"]);
    const topurl =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/Top/type_180.csv";
    await axios
      .get(topurl.replace("type", type))
      .then((response) => {
        if (response.status === 200) {
          let topdetails = [];
          let rows = response.data.split("\n");
          const header = rows[0].split(",");
          const companyindex = header.indexOf("company");
          for (let i = 1; i < num + 1; i++) {
            const row = rows[i];
            const cols = row.split(",");
            topdetails.push(cols[companyindex]);
          }
          res.status(response.status).send({ details: topdetails, message: "Success" });
        } else {
          res.status(response.status).send({ details: [], message: "Error" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ details: [], message: "Error" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ details: [], message: "Error" });
  }
};
