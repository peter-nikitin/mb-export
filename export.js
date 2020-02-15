const axios = require("axios").default;
const fs = require("fs");
const converter = require("json-2-csv");
 

module.exports = (endpoint, secretKey, oparation) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    Authorization: `Mindbox secretKey="${secretKey}"`
  };

  const url = `https://api.mindbox.ru/v3/operations/sync?endpointId=${endpoint}&operation=${oparation}`;

  const write = (err, data) => {
    fs.appendFile("export.csv", data, err => {
      if (err) {
        console.error(err);
        return;
      }
    });
  };
  let lastActionIndex = 1;
  let actionCount = 1;

  const MBexport = lastIndex => {
    axios
      .post(
        url,
        {
          page: {
            itemsPerPage: "1000",
            firstMindboxId: lastIndex
          }
        },
        { headers }
      )
      .then(function(response) {
        lastActionIndex =
          response.data.customerActions[
            response.data.customerActions.length - 1
          ].ids.mindboxId;
        actionCount = response.data.customerActions.length;
        converter.json2csv(response.data.customerActions, write);
        console.log(lastActionIndex);
        if (actionCount > 0) {
          MBexport(lastActionIndex);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
