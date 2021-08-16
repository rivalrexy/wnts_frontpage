import http from "../http-common";

const getAll = (startDate, endDate) => {
  return http.get(`/GasCoOp/last/${startDate}/${endDate}`);
};

const get = (id, startDate, endDate) => {
  return http.get(`/GasCoOp/all/${id}/${startDate}/${endDate}`);
};

const getDate = (startDate, endDate) => {
  return http.get(`/GasCoOp/last/${startDate}/${endDate}`);
};

// const create = (data) => {
//   return http.post("/GasCoOp", data);
// };

// const update = (id, data) => {
//   return http.put(`/GasCoOp/${id}`, data);
// };

// const remove = (id) => {
//   return http.delete(`/GasCoOp/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`/GasCoOp`);
// };

// const findByTitle = (title) => {
//   return http.get(`/GasCoOp?title=${title}`);
// };

const values = {
  getAll,
  get,
  getDate,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default values;
