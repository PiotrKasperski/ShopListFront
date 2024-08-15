import axios from "axios";

const instance = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : window.location.origin + "/api",
});

export default instance;
