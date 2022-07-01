import axios from "axios";

const token = localStorage.getItem("_token") || "";

const baseURL = "http://localhost:8000/api/";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

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
        const renewToken =await instance.post("auth/renewToken");
        console.log(renewToken)
      }
    }
    return Promise.reject({ message: errorMsg });
  }
);

export default instance;
