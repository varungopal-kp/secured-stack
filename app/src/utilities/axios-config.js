import axios from "axios";

const baseURL = "http://localhost:8000/api/";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

let getNewTokenPromise;

const getNewTokens = () =>
  instance
    .post("auth/renewToken", {
      withCredentials: true,
    })
    .then((e) => e);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    let errorMsg = "Someting went wrong";

    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      }
      if (error.response.status == 401 || error.response.status == 403) {
        if (!getNewTokenPromise) {
          try {
            getNewTokenPromise = getNewTokens()
              .then((token) => {
                getNewTokenPromise = null; // clear state
                return token; // resolve with the new token
              })
              .catch((error) => {
                localStorage.setItem("isAuthorised", "");
                return  window.location = "/auth";
              });
          } catch (error) {
            localStorage.setItem("isAuthorised", "");
            return window.location = "/auth";
          }
        }
        return getNewTokenPromise.then((token) => {
          return axios(error.config);
        });
      }
    }
    return Promise.reject({ message: errorMsg });
  }
);

export default instance;
