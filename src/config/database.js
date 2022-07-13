const mongoose = require("mongoose");

module.exports = () => {
  const url = process.env.URL_BD || "mongodb://localhost:27017/aulaApiRest";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };

  mongoose.connect(url, options);

  mongoose.connection.once("open", () => {
    console.log("DB running");
  });
  mongoose.connection.on("error", (err) => {
    console.log(`erro de conexão do mongoose ${err}`);
  });
};
