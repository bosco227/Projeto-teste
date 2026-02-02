import axios from "axios";

const apiPublic = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default apiPublic;
