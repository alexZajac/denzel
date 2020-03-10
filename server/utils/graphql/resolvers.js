const dbProvider = require("../dbprovider");
const populateMovies = require("../../imdb");

const helloResolver = () => "Hello World!";

const populateResolver = async (_, args) => {
  const { id } = args;
  try {
    const results = await populateMovies(id);
    return { total: results.length };
  } catch (e) {
    return { error: e.message };
  }
};

const randomMovieResolver = async () => {
  try {
    const random_movie = await dbProvider.getMustwatchMovie();
    return random_movie;
  } catch (e) {
    return { error: e.message };
  }
};

const movieResolver = async (_, args) => {
  const { id } = args;
  try {
    const movie = await dbProvider.getMovie(id);
    return movie;
  } catch (e) {
    return { error: e.message };
  }
};

const searchMovieResolver = async (_, args) => {
  try {
    let limit = parseInt(args.limit);
    let metascore = parseInt(args.metascore);
    const results = await dbProvider.searchMovies(limit, metascore);
    return { limit, metascore, results };
  } catch (e) {
    return { error: e.message };
  }
};

const postReviewResolver = async (_, args) => {
  const { id, date, review } = args;
  try {
    const result = await dbProvider.saveReview(id, date, review);
    return result;
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  helloResolver,
  populateResolver,
  randomMovieResolver,
  movieResolver,
  searchMovieResolver,
  postReviewResolver
};
