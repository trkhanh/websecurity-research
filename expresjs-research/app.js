const express = require("express");
const mongoose = require("mongoose");

const dbUri = "";
const app = express();
const port = 3000;

mongoose.connect(dbUri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});


app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
  throw new Error("Broken");
});

app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error("Broken");
  }).catch(next);
})


app.get('/', [
  (req, res, next) => {
    fs.readFile('/maybe-valid-file', 'utf8', (err, data) => {
      res.locals.data = data;
      next(err);
    })
  },
  (req, res) => {
    res.locals.data = res.locals.data.split(',')[1];
    res.send(res.locals.data);
  }
])

app.listen(port, () => console.log(`Example app listening on port ${port}!`));