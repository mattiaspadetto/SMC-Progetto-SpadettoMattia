const express = require("express");
const app = express();
const port = 3001;

const dati = {
  data: [{ dato1: 12 }, { dato1: 2 }, { dato1: 6 }, { dato1: 23 }],
};

app.get("/", (req, res) => {
  res.send(dati.data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
