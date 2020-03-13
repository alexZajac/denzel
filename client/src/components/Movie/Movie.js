import React from "react";

import styled from "styled-components";
import { Colors } from "../../Constants";
import Tilt from "react-tilt";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

const TextPart = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 12vw;
  padding-right: 20px;
`;

const ImagePart = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
  cursor: pointer;
`;

const Title = styled.p`
  font-family: "Playfair Display";
  font-weight: 900;
  color: white;
  font-size: 60px;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const Synopsis = styled.p`
  margin-top: 5vh;
  font-family: "Lato";
  color: white;
  font-size: 26px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const HighlightText = styled.p`
  font-family: "Lato";
  color: white;
  font-size: 40px;
  margin: 0;
  font-weight: 700;
  margin-right: 20px;
  @media (max-width: 920px) {
    font-size: 26px;
  }
`;

const Poster = styled.img`
  width: 20vw;
  z-index: 1;
  height: auto;
  box-shadow: 0px 4px 40px ${Colors.lightShade};
`;

const FadeHighlight = styled.div`
  position: absolute;
  text-align: right;
  left: -24vw;
  bottom: 4vh;
  width: 24vw;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 0;
  @media (max-width: 920px) {
    left: -16vw;
    width: 16vw;
    height: 12vh;
  }
`;

const Movie = ({ content }) => {
  const { title, synopsis, metascore, rating, poster, link } = content;
  return (
    <Container>
      <TextPart>
        <Title>{title}</Title>
        <Synopsis>{synopsis}</Synopsis>
      </TextPart>

      <ImagePart onClick={() => window.open(link, "_blank")}>
        <Tilt style={{ zIndex: 1 }} options={{ max: 20, scale: 1.04 }}>
          <Poster src={poster} />
        </Tilt>

        <FadeHighlight
          style={{
            background: `linear-gradient(to left, ${Colors.secondShade}, transparent)`
          }}
        >
          <HighlightText>Metascore: {metascore}</HighlightText>
          <HighlightText>Rating: {rating}</HighlightText>
        </FadeHighlight>
      </ImagePart>
    </Container>
  );
};

export default Movie;
