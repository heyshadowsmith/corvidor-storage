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
app.post("/", async (req, res) => {
  const data = req.body.data;
  const secret = uuid();

  const response = await organism.writeCorvidorFile(data, secret);

  res.send(response);
})

// READ
app.get("/", async (req, res) => {
  const name = req.body.id;
  const secret = req.body.secret;

  const data = await organism.readCorvidorFile(name, secret)

  res.send(data);
})

// UPDATE
app.put("/", async (req, res) => {
  const name = req.body.id;
  const data = req.body.data;
  const secret = req.body.secret;

  const response = await organism.updateCorvidorFile(name, data, secret);

  res.send(response);
})

// DESTROY
app.delete("/", async (req, res) => {
  const name = req.body.id;
  const secret = req.body.secret;

  const response = await organism.deleteCorvidorFile(name, secret)

  res.send(response);
})

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Running on port ${PORT}.`));