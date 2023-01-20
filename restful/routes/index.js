let dict = {
  crud: [
    {
      file: "bikes",
      path: "bikes",
    },
  ],
};
function Routes(app) {
  let entries = Object.keys(dict);
  entries.forEach((folder) => {
    dict[folder].forEach((route) => {
      app.use(
        `/${route.type || "api"}/${route.path || route.file}`,
        require(`./${folder}/${route.file}`)
      );
    });
  });
}

module.exports = Routes;
