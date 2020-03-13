import React from "react";

import {
  Colors,
  REST_API,
  GRAPHQL_API,
  DEFAULT_FILTERS
} from "../../Constants";
import styled from "styled-components";
import graphql from "../../assets/images/graphql.png";
import rest from "../../assets/images/rest.png";

const Container = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const RoundedBackground = styled.div`
  background: ${Colors.mainShade};
  width: 64px;
  height: 30px;
  cursor: pointer;
  border-radius: 30px;
  position: relative;
  transition: all ease-in-out 0.2s;
  margin-top: 10px;
`;
const Disk = styled.div`
  background: ${Colors.mainShade};
  position: absolute;
  left: ${p => (p.api === REST_API ? "0" : "calc(100% - 30px)")};
  height: 30px;
  width: 30px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.66);
  transition: all ease-in-out 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  @media (max-width: 680px) {
    margin-bottom: 10px;
  }
`;

const Logo = styled.img`
  height: 20px;
  width: auto;
`;

const InputTitle = styled.p`
  margin: 0;
  font-family: "Lato";
  font-size: 20px;
  color: white;
  margin-top: 6px;
`;
const Input = styled.input`
  background: ${Colors.mainShade};
  border: none;
  outline: none;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  margin-top: 10px;
  color: white;
  font-family: "Lato";
  font-size: 16px;
  padding-left: 10px;
`;

const Filters = ({ filters, setFilters }) => {
  const { API, LIMIT, METASCORE } = filters;
  const apiName = API === REST_API ? "REST" : "GraphQL";
  const handleLimitChange = LIMIT => {
    if (LIMIT.length > 0) {
      try {
        const intLimit = parseInt(LIMIT);
        setFilters({ ...filters, LIMIT: intLimit });
      } catch (e) {
        setFilters({ ...filters, LIMIT: undefined });
      }
    } else {
      setFilters({ ...filters, LIMIT: undefined });
    }
  };

  const handleMetascoreChange = METASCORE => {
    if (METASCORE.length > 0) {
      try {
        const intMeta = parseInt(METASCORE);
        setFilters({ ...filters, METASCORE: intMeta });
      } catch (e) {
        setFilters({ ...filters, METASCORE: undefined });
      }
    } else {
      setFilters({ ...filters, METASCORE: undefined });
    }
  };

  return (
    <Container
      style={{
        background: `linear-gradient(to right, ${Colors.lightShade}, ${Colors.mainShade})`
      }}
    >
      <InputContainer
        onClick={() =>
          setFilters({
            ...filters,
            API: API === REST_API ? GRAPHQL_API : REST_API
          })
        }
      >
        <InputTitle>{apiName}</InputTitle>
        <RoundedBackground>
          <Disk api={API}>
            <Logo src={API === REST_API ? rest : graphql} />
          </Disk>
        </RoundedBackground>
      </InputContainer>
      <InputContainer>
        <InputTitle>Limit</InputTitle>
        <Input
          placeholder={DEFAULT_FILTERS.LIMIT}
          onChange={({ target: { value: LIMIT } }) => handleLimitChange(LIMIT)}
        />
      </InputContainer>
      <InputContainer>
        <InputTitle>Metascore</InputTitle>
        <Input
          placeholder={DEFAULT_FILTERS.METASCORE}
          onChange={({ target: { value: METASCORE } }) =>
            handleMetascoreChange(METASCORE)
          }
        />
      </InputContainer>
    </Container>
  );
};

export default Filters;
