const axios = require("axios");
const cheerio = require("cheerio");
const pLimit = require("p-limit");
const pSettle = require("p-settle");
const { IMDB_NAME_URL, IMDB_URL, P_LIMIT, MONGO_URI } = require("./constants");
const { MongoClient } = require("mongodb");

/**
 * Get filmography for a given actor
 * @param  {String}  actor - imdb id
 * @return {Array}
 */
const getFilmography = async actor => {
  try {
    const response = await axios(`${IMDB_NAME_URL}/${actor}`);
    const { data } = response;
    const $ = cheerio.load(data);

    return $("#filmo-head-actor + .filmo-category-section .filmo-row b a")
      .map((i, element) => {
        return {
          link: `${IMDB_URL}${$(element).attr("href")}`,
          title: $(element).text()
        };
      })
      .get();
  } catch (error) {
    throw error;
  }
};

/**
 * Get movie from an imdb link
 * @param  {String} link
 * @return {Object}
 */
const getMovie = async link => {
  try {
    const response = await axios(link);
    const { data } = response;
    const $ = cheerio.load(data);

    return {
      link,
      id: $('meta[property="pageId"]').attr("content"),
      metascore: Number($(".metacriticScore span").text()),
      poster: $(".poster img").attr("src"),
      rating: Number($('span[itemprop="ratingValue"]').text()),
      synopsis: $(".summary_text")
        .text()
        .trim(),
      title: $(".title_wrapper h1")
        .text()
        .trim(),
      votes: Number(
        $('span[itemprop="ratingCount"]')
          .text()
          .replace(",", ".")
      ),
      year: Number($("#titleYear a").text())
    };
  } catch (error) {
    throw error;
  }
};

/**
 * writes movies for specific actor to db
 * @param  {Array} movies - Movies to populate
 * @return {number} Number of movies inserted
 */
const writeToDatabase = async movies => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) reject(err);
      const collection = client.db("main").collection("movies");
      collection.deleteMany({}, (err, res) => {
        if (err) reject(err);
        console.log(`Deleted ${res.deletedCount} objects`);
        collection.insertMany(movies, (err, res) => {
          if (err) reject(err);
          console.log(`Number of documents inserted: ${res.insertedCount}`);
          client.close();
          resolve();
        });
      });
    });
  });
};

/**
 * Get all filmography for a given actor
 * @param  {String} actor
 * @return {Array}
 */
module.exports = async actor => {
  const limit = pLimit(P_LIMIT);
  const filmography = await getFilmography(actor);

  const promises = filmography.map(filmo => {
    return limit(async () => {
      return await getMovie(filmo.link);
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results
    .filter(result => result.isFulfilled)
    .map(result => result.value);
  const movies = [].concat.apply([], isFulfilled);
  if (movies.length > 0) await writeToDatabase(movies);
  return movies;
};
