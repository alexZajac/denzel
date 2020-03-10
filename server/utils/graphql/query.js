const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const {
  helloResolver,
  populateResolver,
  randomMovieResolver
} = require("./resolvers");
const { populateType, movieType } = require("./types");

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
    }
  }
});

exports.queryType = queryType;
