import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.5.208:8074/api/",
  headers: {
    "Content-type": "application/json",
  },
});