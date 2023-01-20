const Hapi = require("@hapi/hapi");
const { fetchBikes, formatData } = require("./utils/bikes");
const { createFile, toS3 } = require("./utils/fileSystem");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: 5060,
    host: "localhost",
  });
  server.route({
    method: "GET",
    path: "/api/bike-lambda",
    handler: async (request, h) => {
      try {
        let data = await fetchBikes("bike_lambda", "post");
        data = data.converted_to_csv;
        let csv_directory = __dirname + "/data/csv/divvy_bikes.csv";
        await createFile(csv_directory, data);
        // send to s3 bucket
        let output = await toS3(csv_directory);
        console.log(output);
        return output;
      } catch (error) {
        console.log(error, "testing user error");
      }
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
