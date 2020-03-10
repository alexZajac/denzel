const { MONGO_URI } = require("./constants");
const { MongoClient } = require("mongodb");

/**
 * Movie type
 * @typedef {Object} Movie
 * @property {String} _id - MongoDB id
 * @property {String} link - Link to IMDB
 * @property {String} id - IMDB movie id
 * @property {number} metascore - score to rank the movie
 * @property {String} poster - link to poster url
 * @property {number} rating - rating of the movie
 * @property {String} synopsis - Description of the movie
 * @property {String} title - title of the movie
 * @property {number} votes - number of votes
 * @property {number} year - year of release
 */
/**
 * Gets a random movie from the DB
 * @return {Movie} Movie from the DB
 */
const getRandomMovie = () => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) reject(err);
      const collection = client.db("main").collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      const random_movie = await collection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      if (random_movie.length > 0) resolve(random_movie[0]);
      else reject({ message: "No movie found on the DB." });
    });
  });
};

/**
 * Gets a random movie from the DB
 * @param {String} movieId - the id of the movie
 * @return {Movie} Movie from the DB
 */
const getMovie = id => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) reject(err);
      const collection = client.db("main").collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      try {
        const movie = await collection.findOne({ id });
        if (movie) resolve(movie);
        else reject({ message: "No movie found with that id." });
      } catch (e) {
        reject(e);
      }
    });
  });
};

/**
 * Gets a selection of movies from the DB
 * @param {number} limit - the limit of results
 * @param {number} metascore - the minimum metascore for the movie to be included
 * @return {Movie} Movies from the DB
 */
const searchMovies = (limit, metascore) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) reject(err);
      const collection = client.db("main").collection("movies");
      // all server side with MongoDB
      try {
        const movies = await collection
          .find({
            metascore: { $gte: metascore }
          })
          .limit(limit)
          .toArray();
        if (movies.length > 0) resolve(movies);
        else
          reject({
            message: "No movie found on the DB with these constraints."
          });
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports = {
  getRandomMovie,
  getMovie,
  searchMovies
};
