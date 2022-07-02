import React from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/user";

export default function Index() {
  const dispatch = useDispatch();
  const handeGetUsers = () => {
    dispatch(getUsers());
  };
  return (
    <main>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <div>
                  <div>Home</div>
                  <div>
                    <a className="link">Logout</a>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div className="col">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
