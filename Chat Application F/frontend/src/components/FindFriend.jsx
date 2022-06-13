import { React, useState } from "react";

import styled from "styled-components";

import Logo from "../assets/logo.svg";

import { MdOutlinePersonSearch } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

import { addFriendsRoute } from "../utils/APIRoutes";

function FindFriend({ contacts, currentUser }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentFriend, setCurrentFriend] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleAddButton = async (index, contact) => {
    setCurrentFriend(contact);
    if (currentFriend === undefined) {
      return null;
    } else {
      const { data } = await axios.post(
        `${addFriendsRoute}/${currentUser._id}`,
        {
          _id: currentFriend._id,
        }
      );

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  return (
    <Container>
      <div className="find-friend">
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>snappy</h3>
        </div>
        <form className="input-container">
          <input
            type="text"
            placeholder="Search for friends"
            name="find"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="submit">
            <MdOutlinePersonSearch />
          </button>
        </form>
      </div>
      <div className="contacts">
        {contacts
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.username.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((contact, index) => {
            return (
              <div className="contact" key={index}>
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
                <button
                  className="add-button"
                  onClick={() => handleAddButton(index, contact)}
                >
                  Add
                </button>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 25% 75%;
  overflow: hidden;
  background-color: #080420;
  padding: 1rem;
  .find-friend {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      img {
        height: 2rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }
    .input-container {
      width: 100%;
      height: 30%;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background-color: #ffffff34;
      input {
        width: 90%;
        height: 80%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.1rem;
        &::selection {
          background-color: #9a86f3;
        }
        &:focus {
          outline: none;
        }
      }
    }
    button {
      height: 100%;
      width: 23%;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: 0.5s ease-in-out;
      .avatar {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        img {
          height: 3rem;
        }
        .username {
          display: flex;
          align-items: center;
          justify-content: center;
          h3 {
            color: white;
          }
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .add-button {
    height: 50%;
    width: 25%;
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: white;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
    }
  }
`;

export default FindFriend;
