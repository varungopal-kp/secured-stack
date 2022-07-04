import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/user";
import Layout from "../../hoc/Layout";

export function Index(props) {
  const handeGetUsers = () => {
    props.dispatch(getUsers());
  };
  
  const userList = JSON.stringify(props.users);
  return (
    <div className="card-body">
      <div className="col">
        <div className="row">
          <div className="col-3">You are Logged In</div>
          <div className="col-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handeGetUsers()}
            >
              Get Users
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">Users : {userList}</div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  ...state.user,
}))(Layout(Index, "Home"));
