const axios = require("axios");
export const config = {
  api: {
    externalResolver: true,
  },
};
export default async (req, res, next) => {
  try {
    const companywithidURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/companywithid.json";
    const previousdaystockdetailsURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/Stock/previousdaystockdetails.csv";
    let company = req.query["company"];
    if (company === undefined) {
      await axios
        .get(previousdaystockdetailsURL)
        .then((t) => {
          if (t.status === 200) {
            let previousdaystockdetails = [];
            let rows = t.data.split("\n");
            const header = rows[0].split(",");
            for (let i = 1; i < rows.length; i++) {
              const row = rows[i];
              const cols = row.split(",");
              var result = cols.reduce(function (result, field, index) {
                result[header[index].replace(/(\r\n|\n|\r)/gm, "")] =
                  field.replace(/(\r\n|\n|\r)/gm, "");
                return result;
              }, {});
              previousdaystockdetails.push(result);
            }
            res.status(200).send({ details: previousdaystockdetails, message: "success" });
          } else {
            res.status(404).send({ details: [], message: "Error" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send({ details: [], message: "Error" });
        });
    } else {
      company = company.toUpperCase();
      await axios
        .get(companywithidURL)
        .then((s) => {
          if (s.status === 200) {
            const companywithid = s.data;
            const code = parseInt(companywithid[company]);
            axios
              .get(previousdaystockdetailsURL)
              .then((t) => {
                if (t.status === 200) {
                  let rows = t.data.split("\n");
                  const header = rows[0].split(",");
                  const codeindex = header.indexOf("Code");
                  for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const cols = row.split(",");
                    if (parseInt(cols[codeindex]) === code) {
                      var result = cols.reduce(function (result, field, index) {
                        result[header[index].replace(/(\r\n|\n|\r)/gm, "")] =
                          field.replace(/(\r\n|\n|\r)/gm, "");
                        return result;
                      }, {});
                      res.status(200).send({ details: result, message: "success" });
                      break;
                    }
                  }
                }
              })
              .catch((error) => {
                console.log(error);
                res.status(500).send({ details: [], message: "Error" });
              });
          } else {
            res.status(500).send({ details: [], message: "Error" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ details: [], message: "Error" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ details: [], message: "Error" });
  }
};
