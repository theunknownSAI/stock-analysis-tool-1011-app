const axios = require("axios");

export const config = {
  api: {
    externalResolver: true,
  },
};

export default (req, res, next) => {
  try {
    const sectorsURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/sectors.json";
    axios
      .get(sectorsURL)
      .then((response) => {
        if (response.status === 200) {
          res.status(200).send({ details: response.data, message: "success" })
        } else {
          res.status(404).send({ details: [], message: "Error" })
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ details: [], message: "Error" })

      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ details: [], message: "Error" })
  }
};
