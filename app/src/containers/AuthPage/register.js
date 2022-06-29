import React from "react";
import { Form, Field } from "react-final-form";

export default function Register(props) {
  const onSubmit = (inputs) => {
    try {
      props.handleRegister(inputs);
    } catch (error) {}
  };

  return (
    <main className="auth-form register-page">
      <div className="cotainer">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register</div>
              <div className="card-body">
                <Form
                  className="register-form"
                  onSubmit={onSubmit}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <label
                          for="email_address"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          E-Mail Address
                        </label>
                        <div className="col-md-6">
                          <Field
                            name="email"
                            id="email_address"
                            className="form-control"
                            component="input"
                            type="email"
                            placeholder="Phone Number"
                            required
                            autofocus
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          for="password"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Password
                        </label>
                        <div className="col-md-6">
                          <Field
                            name="password"
                            component="input"
                            type="password"
                            id="password"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6 offset-md-4 auth-btns">
                        <div>
                          <button type="submit" className="btn btn-primary">
                            Register
                          </button>
                        </div>
                        <div>
                          <a
                            className="link"
                            onClick={(e) => props.handlePage("loginPage")}
                          >
                            Login
                          </a>
                        </div>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
