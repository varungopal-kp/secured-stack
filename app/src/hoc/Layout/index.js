import React, { useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { logout } from "../../redux/actions/auth";

export const Layout = (Component, title) => {
  return function WithWrapper(props) {
    const handleLogout = () => {
      return props.dispatch(logout());
    };
    useEffect(() => {
      if (props.error) {
        NotificationManager.error(props.error.message);
      }
    }, [props.error]);
    useEffect(() => {
      if (props.success) {
        NotificationManager.success(props.success.message);
      }
    }, [props.success]);

    return (
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <div>
                    <div>{title}</div>
                    <div>
                      <a className="link" onClick={() => handleLogout()}>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
                <Component {...props} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };
};
export default Layout;
