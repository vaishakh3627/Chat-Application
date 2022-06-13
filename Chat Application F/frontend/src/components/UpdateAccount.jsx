import React from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Gif from "../assets/robot.gif";

function UpdateAccount({ currentUser }) {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/");
  };

  return (
    <Container>
      <img src={Gif} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Profile update comming soon.</h3>
      <button onClick={handleButton}>Back to Chat</button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  gap: 1rem;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    height: 2rem;
    color: white;
  }
`;

export default UpdateAccount;
