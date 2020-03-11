import React from "react";

import { Colors } from "../../Constants";
import styled from "styled-components";

const Head = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: ${Colors.secondShade};
  display: flex;
  align-items: center;
`;
const Denzl = styled.p`
  margin: 0;
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 40px;
  color: white;
  margin-left: 20px;
`;

const Header = () => (
  <Head>
    <Denzl>DENZL.</Denzl>
  </Head>
);

export default Header;
