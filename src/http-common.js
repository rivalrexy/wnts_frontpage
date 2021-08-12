import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.193.60:8102/api/",
  headers: {
    "Content-type": "application/json",
  },
});