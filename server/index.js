const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { PORT, DENZEL_IMDB_ID } = require("./constants");
const populateMovies = require("./imdb");

const app = express();

module.exports = app;

app.use(require("body-parser").json());
app.use(cors());
app.use(helmet());

app.options("*", cors());

app.get("/", (request, response) => {
  response.send({ ack: true });
});

/*
FIRST ENDPOINT: populate db with movies of an actor id
*/
app.get("/movies/populate/:id", async (request, response) => {
  const { id: actorId } = request.params || DENZEL_IMDB_ID;
  try {
    const results = await populateMovies(actorId);
    response.send({ total: results.length });
  } catch (e) {
    console.log(e);
    response.status(404).send({ error: e.message });
  }
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
