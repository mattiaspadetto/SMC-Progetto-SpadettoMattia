const express = require("express");
const app = express();
const port = 3001;

const dati = {
  error: [false],
  values: [
    { day: 25, month: 7, year: 2021, create: 4, change: 2, delete: 5 },
    { day: 24, month: 7, year: 2021, create: 5, change: 6, delete: 1 },
    { day: 23, month: 7, year: 2021, create: 4, change: 4, delete: 3 },
    { day: 22, month: 7, year: 2021, create: 1, change: 8, delete: 2 },
    { day: 21, month: 7, year: 2021, create: 5, change: 7, delete: 6 },
    { day: 20, month: 7, year: 2021, create: 8, change: 9, delete: 9 },
    { day: 19, month: 7, year: 2021, create: 3, change: 2, delete: 3 },
  ],
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send(dati.values);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
