const axios = require("axios");

export const config = {
  api: {
    externalResolver: true,
  },
};

export default (req, res, next) => {
  try {
    const sp500URL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/sp500.csv";
    axios
      .get(sp500URL)
      .then((response) => {
        if (response.status === 200) {
          let sp500details = [];
          let rows = response.data.split("\n");
          const header = rows[0].split(",");
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cols = row.split(",");
            var result = cols.reduce(function (result, field, index) {
              result[header[index].replace(/(\r\n|\n|\r)/gm, "")] =
                field.replace(/(\r\n|\n|\r)/gm, "");
              return result;
            }, {});
            sp500details.push(result);
          }
          res.status(200).send({ details: sp500details, message: "success" });
        } else {
          res.status(404).send({ details: [], message: "Error" });
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
