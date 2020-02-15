const fs = require('fs')
const converter = require('json-2-csv');

const write = (err, data) => {
  fs.writeFile('export.csv', data , err => {
    if (err) {
      console.error(err)
      return
    }
  })
};

const convert = (err, data) => {
  converter.json2csv(JSON.parse(data), write);
};

let json2csvCallback = function (err, csv) {
  if (err) throw err;
  console.log(csv);
};


fs.readFile('response.json',convert );