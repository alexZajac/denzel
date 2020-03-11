import React from "react";

import styled from "styled-components";
import { Colors } from "../../Constants";
import empty_movies from "../../assets/images/empty_movies.svg";

import Movie from "../Movie";
import SkeletonMovie from "../SkeletonMovie";

const Container = styled.div`
  background-color: ${Colors.mainShade};
  width: 100vw;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const EmptyText = styled.p`
  margin: 0;
  color: white;
  font-family: "Lato";
  font-size: 26px;
`;

const Logo = styled.img`
  width: 30vw;
  height: auto;
`;

const MovieContainer = ({ movies, loading }) => {
  const renderEmptyMovies = () => (
    <EmptyContainer>
      <Logo src={empty_movies} />
      <EmptyText>Il n'y pas de film a afficher ici...</EmptyText>
    </EmptyContainer>
  );

  return (
    <Container>
      {loading
        ? [null, null, null].map((_, i) => <SkeletonMovie key={i} />)
        : !movies || movies.length === 0
        ? renderEmptyMovies()
        : movies.map(m => <Movie key={m._id} content={m} />)}
    </Container>
  );
};

export default MovieContainer;
