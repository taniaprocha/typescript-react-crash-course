import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect, MapDispatchToProps } from "react-redux";
import styled from "styled-components";
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessageAction,
} from "../store/user/UserActions";
import { User } from "../store/user/UserTypes";
import { AppState } from "../store/RootReducer";

const StyledApp = styled.div`
  text-align: center;
`;

interface AppProps {
  username: string | undefined;
  userType: "admin" | "moderator" | "user" | "guest";
}

interface AppDispatchToProps {
  saveUsername: (user: User) => void;
  saveUserMessage: (user: User) => void;
}

const AppUnconnected: FC<AppDispatchToProps & AppProps> = ({
  userType,
  username,
  saveUsername,
  saveUserMessage,
}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);

    if (username) {
      saveUsername({ username, userMessage: message });
    }

    return () => {
      clearInterval(timer);
    };
  }, [username, saveUsername]);

  useEffect(() => {
    saveUserMessage({ username, userMessage: message });
  }, [message, saveUserMessage]);

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <StyledApp>
      <p>
        Hi, {username ? username : "Misterious Entity"}, your user type is{" "}
        {username ? userType : "irrevelant because I do not know you"}.
      </p>
      <p>{time.toUTCString()}</p>
      <input
        type="text"
        placeholder="Enter your message here"
        value={message}
        onChange={handleTextChange}
      />
      <p>Your message: {message}</p>
      <Link to="/userlist">User List</Link>
    </StyledApp>
  );
};

const mapDispatchToProps: MapDispatchToProps<AppDispatchToProps, AppProps> = (
  dispatch: Dispatch,
  ownProps: AppProps
): AppDispatchToProps => ({
  saveUsername: (user: User) => {
    dispatch(saveUsernameAction(user));
  },

  saveUserMessage: (user: User) => {
    dispatch(saveUserMessageAction(user));
  },
});

export const App = connect<{}, AppDispatchToProps, AppProps, AppState>(
  null,
  mapDispatchToProps
)(AppUnconnected);
