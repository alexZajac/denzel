const cors = require("cors");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const helmet = require("helmet");

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

app.listen(PORT);
console.log(`📡 Graphql server running on port ${PORT}`);

module.exports = app;
