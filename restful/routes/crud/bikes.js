const express = require("express");
const router = express.Router();
const { fetchBikes, formatData } = require("../../utils/bikes");
const { convertToCSV, createFile, toS3 } = require("../../utils/fileSystem");

router.get("/all", async (req, res) => {
  try {
    let bikes = await fetchBikes();
    if (!bikes) {
      throw "Server Error";
    }
    // maintain configuration file in case config is coming from an api instead of hard coded

    let output = formatData(bikes);

    res.send(output);
  } catch (error) {
    res.status(501).send("Server Error");
  }
});

router.post("/create-csv", async (req, res) => {
  try {
    let bikes = await fetchBikes("divvybikes");
    if (!bikes) {
      throw "Server Error";
    }
    let data = formatData(bikes);
    let converted_to_csv = convertToCSV(data);
    let csv_directory = __dirname + "../../../data/csv/divvy_bikes.csv";
    await createFile(csv_directory, converted_to_csv);
    res.send(`CSV File Path: ${csv_directory}`);
  } catch (error) {
    res.status(501).send("Server Error");
    console.log(error);
  }
});

router.post("/bike-lambda", async (req, res) => {
  try {
    let data = await fetchBikes("bike_lambda", "post");
    data = data.converted_to_csv;
    let csv_directory = __dirname + "../../../data/csv/divvy_bikes.csv";
    await createFile(csv_directory, data);
    // send to s3 bucket
    let output = await toS3(csv_directory);
    console.log(output);
    res.send(`CSV File Path: ${csv_directory}`);
  } catch (error) {
    res.status(501).send("Server Error");
    console.log(error);
  }
});

module.exports = router;
