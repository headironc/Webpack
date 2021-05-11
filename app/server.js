const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../config.env` });
const app = require("./app");

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`App is running on http://${host}:${port}`);
});
