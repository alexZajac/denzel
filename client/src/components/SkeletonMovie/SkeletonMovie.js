import React from "react";

import styled from "styled-components";
import { Colors } from "../../Constants";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
`;

const Synopsis = styled.p`
  margin-top: 5vh;
  font-family: "Lato";
  color: white;
  font-size: 26px;
`;

const HighlightText = styled.p`
  font-family: "Lato";
  color: white;
  font-size: 40px;
  margin: 0;
  font-weight: 700;
  margin-right: 20px;
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
`;

const SkeletonMovie = () => (
  <Container>
    <TextPart>
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="40vw" height="10vh" />
      </SkeletonTheme>
      <div style={{ height: "10px" }} />
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="16vw" height="10vh" />
      </SkeletonTheme>
      <div style={{ height: "10vh" }} />
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="24vw" height="4vh" />
      </SkeletonTheme>
      <div style={{ height: "10px" }} />
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="24vw" height="4vh" />
      </SkeletonTheme>
      <div style={{ height: "10px" }} />
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="20vw" height="4vh" />
      </SkeletonTheme>
      <div style={{ height: "10px" }} />
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="12vw" height="4vh" />
      </SkeletonTheme>
    </TextPart>

    <ImagePart>
      <SkeletonTheme
        color={Colors.secondShade}
        highlightColor={Colors.boneHighlight}
      >
        <Skeleton width="20vw" height="60vh" />
      </SkeletonTheme>

      <FadeHighlight
        style={{
          background: `linear-gradient(to left, ${Colors.secondShade}, transparent)`
        }}
      >
        <SkeletonTheme
          color={Colors.secondShade}
          highlightColor={Colors.boneHighlight}
        >
          <Skeleton width="20vw" height="25vh" />
        </SkeletonTheme>
      </FadeHighlight>
    </ImagePart>
  </Container>
);

export default SkeletonMovie;
