import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import styled from "styled-components";
import { User } from "../store/user/UserTypes";
import { AppState } from "../store/RootReducer";
import { getFriendList as getFriendListAction } from "../store/user/UserActions";

const CenterContent = styled.div`
  text-align: center;
`;

interface UserListProps {}

interface UserListStateToProps {
  user: User;
}

interface UserListDispatchToProps {
  getFriendList: (url: string) => void;
}

type UserList = UserListStateToProps & UserListDispatchToProps & UserListProps;

export const UserListUnconnected: FC<UserList> = ({
  user,
  getFriendList,
}): JSX.Element => {
  const [fetchFriends, setFetchFriends] = useState<boolean>(true);

  useEffect(() => {
    if (fetchFriends) {
      getFriendList("https://jsonplaceholder.typicode.com/users");
      setFetchFriends(false);
    }
  }, [fetchFriends, getFriendList]);

  let friendListJsx: JSX.Element | undefined = undefined;
  if (user.friendList) {
    friendListJsx = (
      <ul>
        {user.friendList.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    );
  }

  return (
    <CenterContent>
      <p>
        Retrieved Username:
        {user.username ? user.username : "No username found"}
      </p>
      <p>
        Retrieved User Message:
        {user.userMessage ? user.userMessage : "No message found"}
      </p>
      <p>UserList</p>
      <Link to="/">Home</Link>
      <h3>Friend List</h3>
      {friendListJsx ? friendListJsx : null}
    </CenterContent>
  );
};

const mapDispatchToProps: MapDispatchToProps<
  UserListDispatchToProps,
  UserListProps
> = (dispatch: ThunkDispatch<{}, {}, AnyAction>, ownProps: UserListProps) => ({
  getFriendList: async (url: string) => {
    dispatch(getFriendListAction(url));
  },
});

const mapStateToProps: MapStateToProps<
  UserListStateToProps,
  UserListProps,
  AppState
> = (state: AppState, ownProps: UserListProps): UserListStateToProps => ({
  user: state.user,
  ...ownProps,
});

export const UserList = connect<
  UserListStateToProps,
  UserListDispatchToProps,
  UserListProps,
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(UserListUnconnected);
