import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { login, register } from "../../redux/actions/auth";
import { NotificationManager } from "react-notifications";
import LoginPage from "./login";
import RegisterPage from "./register";

export function Index(props) {
  require("./style.css");
  const [page, setPage] = useState("loginPage");
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleLogin = (inputs) => {
    dispatch(login(inputs));
  };

  const handleRegister = (inputs) => {
    dispatch(register(inputs));
  };

  const handlePage = (page) => {
    setPage(page);
  };

  if (page == "loginPage") {
    return <LoginPage handlePage={handlePage} handleLogin={handleLogin} />;
  } else {
    return (
      <RegisterPage handlePage={handlePage} handleRegister={handleRegister} />
    );
  }
}
export default connect((state) => ({
  auth: state.auth,
}))(Index);
