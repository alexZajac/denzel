const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = require("graphql");

// defin populate type
const populateType = new GraphQLObjectType({
  name: "PopulateType",
  fields: {
    total: { type: GraphQLInt },
    error: { type: GraphQLString }
  }
});

// define review type
const reviewType = new GraphQLObjectType({
  name: "reviewType",
  fields: {
    date: { type: GraphQLString },
    review: { type: GraphQLString }
  }
});

// Define Movie Type
const movieType = new GraphQLObjectType({
  name: "movieType",
  fields: {
    _id: { type: GraphQLID },
    reviews: { type: new GraphQLList(reviewType) },
    link: { type: GraphQLString },
    id: { type: GraphQLString },
    metascore: { type: GraphQLInt },
    poster: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    synopsis: { type: GraphQLString },
    title: { type: GraphQLString },
    votes: { type: GraphQLFloat },
    year: { type: GraphQLInt },
    error: { type: GraphQLString }
  }
});

module.exports = {
  populateType,
  movieType
};
