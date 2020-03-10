const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const {
  PORT,
  DENZEL_IMDB_ID,
  LIMIT_SEARCH,
  METASCORE_SEARCH
} = require("./constants");
const populateMovies = require("./imdb");
const dbProvider = require("./dbprovider");

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
  const id = request.params.id || DENZEL_IMDB_ID;
  try {
    const results = await populateMovies(id);
    response.send({ total: results.length });
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

/*
SECOND ENDPOINT: Return a random must watch movie from the DB
*/
app.get("/movies", async (request, response) => {
  try {
    const random_movie = await dbProvider.getMustwatchMovie();
    response.send(random_movie);
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

/*
THIRD/FOURTH ENDPOINT: get specific movie id / or search movies
*/
app.get("/movies/:id", async (request, response) => {
  const { id } = request.params;
  try {
    // search movies route
    if (id === "search") {
      let limit = parseInt(request.query.limit || LIMIT_SEARCH);
      let metascore = parseInt(request.query.metascore || METASCORE_SEARCH);
      const results = await dbProvider.searchMovies(limit, metascore);
      response.send({ limit, metascore, results });
    } else {
      const movie = await dbProvider.getMovie(id);
      response.send(movie);
    }
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
