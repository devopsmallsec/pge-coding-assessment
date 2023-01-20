const axios = require("axios");
const urls = require("../config/urls");

let config = {
  key_change: {
    external_id: "externalId",
    station_id: "stationId",
    legacy_id: "legacyId",
  },
  remove: ["rental_methods", "rental_uris"],
};

const fetchBikes = async (url_key, method = "get") => {
  // fetch bikes from api
  let bikes = await axios[method](urls[url_key]);
  // axios maintain data response on data keys
  let output = bikes.data;
  return output;
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

module.exports = {
  fetchBikes,
  formatData,
};
