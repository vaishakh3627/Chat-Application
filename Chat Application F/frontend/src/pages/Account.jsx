import { React, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import styled from "styled-components";

import { allUsersRoute } from "../utils/APIRoutes";

import FindFriend from "../components/FindFriend";
import UpdateAccount from "../components/UpdateAccount";

function Account() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchContact();
  }, [currentUser]);

  return (
    <>
      {currentUser && (
        <Container>
          <div className="container">
            <FindFriend contacts={contacts} currentUser={currentUser} />
            <UpdateAccount currentUser={currentUser} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 40% 60%;
  }
`;

export default Account;
