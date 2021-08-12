import http from "../http-common";

const getAll = () => {
  return http.get("/GasComponent_");
};

const get = (id) => {
  return http.get(`/GasComponent_/${id}`);
};

const create = (data) => {
  return http.post("/GasComponent_", data);
};

const update = (id, data) => {
  return http.put(`/GasComponent_/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/GasComponent_/${id}`);
};

const removeAll = () => {
  return http.delete(`/GasComponent_`);
};

const findByTitle = (title) => {
  return http.get(`/GasComponent_?title=${title}`);
};

const values = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default values;
