require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");
const fs = require("fs");

const app = express();
mongoose.connect(process.env.MONGO_URL_DB, {
  useNewUrlParser: true,
});

const directory = "pdfs";

setInterval(() => {
  fs.readdir(directory, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });

      try {
        await mongoose.connection.db.dropCollection("posts", (err, cb) => {
          if (err) console.log(err);
          console.log(cb);
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
}, 1000 * 60 * 60 * process.env.TIME_CLEAR_UPLOAD);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/files", express.static(path.resolve(__dirname, "..", "pdfs")));

app.use(require("./routes"));

app.listen(process.env.PORT);
