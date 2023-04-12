// src/components/Home.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const homeContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  background-color: #5c6bc0;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3f51b5;
  }
`;

const Home = () => {
    return (
        <div css={homeContainer}>
            <StyledLink to="/login">
                Login
            </StyledLink>
            <StyledLink to="/register">
                Register
            </StyledLink>
        </div>
    );
};

export default Home;
