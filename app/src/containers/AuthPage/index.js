import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/actions/auth";
import { NotificationManager } from "react-notifications";
import LoginPage from "./login";
import RegisterPage from "./register";

export function Index(props) {
  const [page, setPage] = useState("loginPage");

  useEffect(() => {
    if (props.auth.isAuthorised === true) {
      localStorage.setItem("isAuthorised", true);
      window.location = "/";
    }
  }, [props.auth.isAuthorised]);

  useEffect(() => {
    if (props.auth.error) {
      NotificationManager.error(props.auth.error.message);
    }
  }, [props.auth.error]);

  const handleLogin = (inputs) => {
    props.dispatch(login(inputs));
  };

  const handleRegister = (inputs) => {
    props.dispatch(register(inputs));
  };

  const handlePage = (page) => {
    setPage(page);
  };

  if (page == "loginPage") {
    return (
      <LoginPage
        handlePage={handlePage}
        handleLogin={handleLogin}
        loading={props.auth.loading}
      />
    );
  } else {
    return (
      <RegisterPage
        handlePage={handlePage}
        handleRegister={handleRegister}
        loading={props.auth.loading}
      />
    );
  }
}
export default connect((state) => ({
  auth: state.auth,
}))(Index);
