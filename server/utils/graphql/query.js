const { GraphQLObjectType, GraphQLString } = require("graphql");

//Define the Query
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,

      resolve: () => {
        return "Hello World";
      }
    }
  }
});

exports.queryType = queryType;
