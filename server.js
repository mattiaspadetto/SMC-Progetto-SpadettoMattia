const fs = require("fs");
const http = require("http");
const port = 8010;

//Creazione server
const server = http.createServer((request, response) => {
  let json = "db.json";
  response.setHeader("Content-Type", "application/json");
  render(response, json);
});

function render(response, json) {
  fs.stat(`./${json}`, (err, stats) => {
    if (stats) {
      response.statusCode = 200;
      respond;
    }
  });
}

//Attviazione web server
server.listen(port);
