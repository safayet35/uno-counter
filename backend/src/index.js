import app from "./app.js";
import connectDb from "./db/db.js";
import _config from "./config/config.js";

const port = _config.port || 8000;

connectDb();

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
