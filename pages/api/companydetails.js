const axios = require("axios");

export const config = {
  api: {
    externalResolver: true,
  },
};

export default (req, res, next) => {
  try {
    let company = req.query["company"];
    const companydetailsURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/companies.json";

    axios
      .get(companydetailsURL)
      .then((s) => {
        if (s.status === 200) {
          const companies = s.data;
          if (company === undefined) {
            res.status(500).send({ details: [], message: "Error" });
          } else {
            company = company.toUpperCase();
            res.status(200).send({ details: companies[company], message: "success" });
          }
        } else {
          res.status(500).send({ details: [], message: "Error" });
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
