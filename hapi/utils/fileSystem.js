const fs = require("fs");
const S3Server = require("aws-sdk/clients/s3");

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_REGION } =
  process.env;

const s3Server = new S3Server({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretKey: AWS_SECRET_KEY,
});

function convertToCSV(arr) {
  const values = [Object.keys(arr[0])].concat(arr);

  let output = values
    .map((value) => {
      return Object.values(value).toString();
    })
    .join("\n");

  return output;
}

async function createFile(path, data) {
  await fs.writeFile(path, data, function (err) {
    if (err) throw err;
  });
}

async function toS3(path, file_name) {
  const file_stream = fs.createReadStream(path);
  console.log(AWS_ACCESS_KEY, AWS_BUCKET_NAME);
  const config = {
    Bucket: AWS_BUCKET_NAME,
    Body: file_stream,
    Key: file_name || "divvy-bikes.csv",
  };

  let output = await s3Server.upload(config).promise();
  return output;
}

module.exports = {
  convertToCSV,
  createFile,
  toS3,
};
