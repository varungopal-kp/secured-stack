import React from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/user";

export default function Index() {
  const dispatch = useDispatch();
  const handeGetUsers = () => {
    dispatch(getUsers());
  };
  return (
    <div>
      <div>Home</div>
      <button onClick={(e) => handeGetUsers()}>Get Users</button>
    </div>
  );
}
