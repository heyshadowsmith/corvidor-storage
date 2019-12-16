const express = require("express");
const app = express();
const uuid = require("uuid/v4");
const organism = require("./js/organisms");

app.use(
  express.json({
    limit: "50mb"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

// CREATE
app.post("/", (req, res) => {
  const data = req.body.data;
  const secret = uuid();

  res.send(organism.writeCorvidorFile(data, secret));
})

// READ
app.get("/", (req, res) => {
  const name = req.body.id;
  const secret = req.body.secret;

  res.send(organism.readCorvidorFile(name, secret));
})

// UPDATE
app.put("/", (req, res) => {
  const name = req.body.id;
  const data = req.body.data;
  const secret = req.body.secret;

  res.send(organism.updateCorvidorFile(name, data, secret));
})

// DESTROY
app.delete("/", (req, res) => {
  const name = req.body.id;
  const secret = req.body.secret;

  res.send(organism.deleteCorvidorFile(name, secret));
})

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Running on port ${PORT}.`));