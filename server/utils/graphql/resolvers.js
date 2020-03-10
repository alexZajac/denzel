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

module.exports = {
  helloResolver,
  populateResolver,
  randomMovieResolver
};
