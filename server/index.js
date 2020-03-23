const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const graphqlHTTP = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const { queryType } = require("./utils/graphql/query");
const {
  PORT,
  DENZEL_IMDB_ID,
  LIMIT_SEARCH,
  METASCORE_SEARCH
} = require("./constants");
const populateMovies = require("./imdb");
const dbProvider = require("./utils/dbprovider");

const app = express();
const schema = new GraphQLSchema({ query: queryType });

app.use(require("body-parser").json());
app.use(cors());
app.use(helmet());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

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
      // parse parameters with defaults, to int
      let limit = parseInt(request.query.limit || LIMIT_SEARCH);
      let metascore = parseInt(request.query.metascore || METASCORE_SEARCH);
      const results = await dbProvider.searchMovies(limit, metascore);
      response.send({ limit, metascore, total: results.length, results });
    } else {
      const movie = await dbProvider.getMovie(id);
      response.send(movie);
    }
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

/*
FIFTH ENDPOINT: post a review to the specific movie
*/
app.post("/movies/:id", async (request, response) => {
  const { id } = request.params;
  // if not provided, adds null
  const { date, review } = request.body;
  try {
    const result = await dbProvider.saveReview(id, date, review);
    response.send(result);
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);


module.exports = app;