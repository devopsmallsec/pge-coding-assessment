var fs = require("fs");
const axios = require("axios");

async function divvyBike(event, context) {
  const fetchBikes = async () => {
    // fetch bikes from api
    let bikes = await axios.get(
      "https://gbfs.divvybikes.com/gbfs/en/station_information.json"
    );
    // axios maintain data response on data keys
    let output = bikes.data;
    return output;
  };
  let config = {
    key_change: {
      external_id: "externalId",
      station_id: "stationId",
      legacy_id: "legacyId",
    },
    remove: ["rental_methods", "rental_uris"],
  };

  const formatData = (bikes) => {
    let output = bikes.data.stations.map((bike) => {
      let output = { ...bike };
      for (const property in config.key_change) {
        config.remove.push(property);
        output[config.key_change[property]] = bike[property];
      }
      config.remove.forEach((element) => {
        delete output[element];
      });

      return output;
    });

    output = output.filter((bike) => bike.capacity < 12);
    return output;
  };

  function convertToCSV(arr) {
    let values = [Object.keys(arr[0])].concat(arr);

    let output = values
      .map((value) => {
        return Object.values(value).toString();
      })
      .join("\n");

    return output;
  }

  let bikes = await fetchBikes();
  let data = formatData(bikes);
  let converted_to_csv = convertToCSV(data);

  return {
    statusCode: 201,
    body: JSON.stringify({ converted_to_csv }),
  };
}

module.exports.handler = divvyBike;
