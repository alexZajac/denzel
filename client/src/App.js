import React, { useState, useEffect } from "react";
import "./assets/fonts/index.css";
import axios from "axios";

import styled from "styled-components";

import { Header, MovieContainer, Filters } from "./components";
import {
  REACT_APP_API_BASE,
  DEFAULT_FILTERS,
  REST_API,
  MOVIE_SEARCH_QUERY,
  RANDOM_MOVIE_QUERY
} from "./Constants";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const getSearchMoviesData = async filters => {
  const { API, LIMIT, METASCORE } = filters;
  let response;
  try {
    if (API === REST_API) {
      // fetch random movie if one film
      if (LIMIT === 1)
        response = await axios.get(`${REACT_APP_API_BASE}/movies`);
      else
        response = await axios.get(
          `${REACT_APP_API_BASE}/movies/search?limit=${LIMIT}&metascore=${METASCORE}`
        );
      const { data, status } = response;
      if (status === 200) return LIMIT === 1 ? [data] : data.results;
    }
    // graphql API
    else {
      if (LIMIT === 1) {
        response = await axios.post(
          `${REACT_APP_API_BASE}/graphql`,
          RANDOM_MOVIE_QUERY
        );
        const { data: resp, status } = response;
        if (status === 200) return [resp.data.randomMovie];
      } else {
        response = await axios.post(
          `${REACT_APP_API_BASE}/graphql`,
          MOVIE_SEARCH_QUERY(LIMIT, METASCORE)
        );
        const { data: resp, status } = response;
        if (status === 200) return resp.data.searchMovie.results;
      }
    }
  } catch (e) {
    return [];
  }
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getSearchMoviesData(filters);
      setMovies(movies);
    };
    if (loading) fetchMovies();
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, [movies]);

  useEffect(() => {
    setLoading(true);
  }, [filters]);

  return (
    <AppContainer>
      <Header />
      <Filters filters={filters} setFilters={setFilters} />
      <MovieContainer loading={loading} movies={movies} />
    </AppContainer>
  );
};

export default App;
