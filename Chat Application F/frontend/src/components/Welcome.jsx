import React from "react";

import styled from "styled-components";

import Robot from "../assets/robot.gif";

import Logout from "../components/Logout";

function Welcome({ currentUser }) {
  return (
    <Container>
      <div className="logout-button">
        <Logout />
      </div>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Start Messaging using SNAPPY.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  .logout-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2rem;
  }
  img {
    height: 20rem;
    margin-top: 5rem;
  }
  span {
    color: #4e00ff;
  }
`;

export default Welcome;
