import http from "../http-common";

const getAll = () => {
  return http.get("/GasOperation_");
};

const get = (id) => {
  return http.get(`/GasOperation_/${id}`);
};

const getDate = (startDate, endDate) => {
  return http.get(`/GasOperation_/${startDate}/${endDate}`);
};

const create = (data) => {
  return http.post("/GasOperation_", data);
};

const update = (id, data) => {
  return http.put(`/GasOperation_/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/GasOperation_/${id}`);
};

const removeAll = () => {
  return http.delete(`/GasOperation_`);
};

const findByTitle = (title) => {
  return http.get(`/GasOperation_?title=${title}`);
};

const values = {
  getAll,
  get,
  getDate,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default values;
