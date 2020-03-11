const IMDB_NAME_URL = "https://www.imdb.com/name";
const IMDB_TITLE_URL = "https://www.imdb.com/title";
const DENZEL_IMDB_ID = "nm0000243";
const IMDB_URL = "https://www.imdb.com";
const P_LIMIT = 25;
const LIMIT_SEARCH = 5;
const METASCORE_SEARCH = 0;
let { PORT, MONGO_URI } = process.env;
if (PORT === undefined) PORT = 9292;
const METASCORE_DEFAULT = 70;

module.exports = {
  IMDB_NAME_URL,
  IMDB_TITLE_URL,
  IMDB_URL,
  DENZEL_IMDB_ID,
  METASCORE_DEFAULT,
  MONGO_URI,
  LIMIT_SEARCH,
  METASCORE_SEARCH,
  P_LIMIT,
  PORT
};
