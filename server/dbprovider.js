const { MONGO_URI } = require("./constants");
const { MongoClient } = require("mongodb");
const { METASCORE_DEFAULT } = require("./constants");

/**
 * Movie type
 * @typedef {Object} Movie
 * @property {String} _id - MongoDB id
 * @property {Array} reviews - Reviews added by the 5th endpoint
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
const getMustwatchMovie = () => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) reject({ message: err });
      const collection = client.db("main").collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      try {
        const all_movies = await collection.find().toArray();
        const awesome_movies = all_movies.filter(
          movie => movie.metascore >= METASCORE_DEFAULT
        );
        if (awesome_movies.length > 0)
          resolve(
            awesome_movies[Math.floor(Math.random() * awesome_movies.length)]
          );
        else reject({ message: "No awesome metascore movies!" });
      } catch (e) {
        reject({ message: e });
      }
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
      if (err) reject({ message: err });
      const collection = client.db("main").collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      try {
        const movie = await collection.findOne({ id });
        if (movie) resolve(movie);
        else reject({ message: "No movie found with that id." });
      } catch (e) {
        reject({ message: e });
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
      if (err) reject({ message: err });
      const collection = client.db("main").collection("movies");
      // all server side with MongoDB
      try {
        const movies = await collection
          .find({
            // metascore greater or equal
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
        reject({ message: e });
      }
    });
  });
};

/**
 * Saves a review for a film into the DB
 * @param {number} date - the date of the review
 * @param {number} review - The content of the review
 * @return {Object} The updated id object
 */
const saveReview = (id, date, review) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) reject({ message: err });
      const collection = client.db("main").collection("movies");
      // all server side with MongoDB
      try {
        const res = await collection.findOneAndUpdate(
          { id },
          { $push: { reviews: { date, review } } }
        );
        if (res && res.value !== null) {
          const {
            value: { _id }
          } = res;
          resolve({ _id });
        } else reject({ message: "Can't find this id in the DB." });
      } catch (e) {
        reject({ message: e });
      }
    });
  });
};

module.exports = {
  getMustwatchMovie,
  getMovie,
  searchMovies,
  saveReview
};
