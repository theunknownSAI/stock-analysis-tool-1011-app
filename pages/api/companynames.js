const axios = require("axios");

export const config = {
  api: {
    externalResolver: true,
  },
};

export default (req, res) => {
  try {
    const companywithidURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/companywithid.json";
    axios
      .get(companywithidURL)
      .then((s) => {
        if (s.status === 200) {
          const companyNames = Object.keys(s.data);
          res.status(200).send({ details: companyNames, message: "success" });
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
