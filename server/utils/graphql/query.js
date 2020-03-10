const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const {
  helloResolver,
  populateResolver,
  randomMovieResolver,
  movieResolver,
  searchMovieResolver
} = require("./resolvers");
const { populateType, movieType, movieSearchType } = require("./types");

//Define the Query
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: helloResolver
    },
    populate: {
      type: populateType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: populateResolver
    },
    randomMovie: {
      type: movieType,
      resolve: randomMovieResolver
    },
    movie: {
      type: movieType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: movieResolver
    },
    searchMovie: {
      type: movieSearchType,
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
        metascore: { type: GraphQLInt, defaultValue: 0 }
      },
      resolve: searchMovieResolver
    }
  }
});

exports.queryType = queryType;
