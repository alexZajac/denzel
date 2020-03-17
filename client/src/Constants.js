const Colors = {
  mainShade: "#000216",
  secondShade: "#00063D",
  boneHighlight: "#0C124F",
  lightShade: "#6472F6"
};

const REACT_APP_API_BASE = process.env.NODE_ENV === "production" ? "https://denzel-apis.herokuapp.com" : "http://localhost:9292";

const MUST_WATCH_METASCORE = 70;
const REST_API = "REST_API";
const GRAPHQL_API = "GRAPHQL_API";

const RANDOM_MOVIE_QUERY = {
  query: `{
    randomMovie {
      title,
      rating,
      link,
      poster,
      synopsis,
      metascore
    }
  }`
};
const MOVIE_SEARCH_QUERY = (limit, metascore) => {
  if (limit) {
    if (metascore) {
      return {
        query: `{
          searchMovie (limit: ${limit}, metascore: ${metascore}) {
            results {
              title,
              rating,
              link,
              poster,
              synopsis,
              metascore
            }
          }
        }`
      };
    }
    return {
      query: `{
        searchMovie (limit: ${limit}) {
          results {
            title,
            rating,
            link,
            poster,
            synopsis,
            metascore
          }
        }
      }`
    };
  }
  return {
    query: `{
        searchMovie {
          results {
            title,
            rating,
            link,
            poster,
            synopsis,
            metascore
          }
        }
      }`
  };
};

const DEFAULT_FILTERS = {
  API: REST_API,
  LIMIT: 1,
  METASCORE: MUST_WATCH_METASCORE
};

export {
  Colors,
  DEFAULT_FILTERS,
  RANDOM_MOVIE_QUERY,
  REACT_APP_API_BASE,
  REST_API,
  GRAPHQL_API,
  MOVIE_SEARCH_QUERY
};
