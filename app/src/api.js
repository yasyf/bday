import axios from "axios";

import { snakeCaseKeys, camelCaseKeys } from "./util";

const client = axios.create({ baseURL: process.env.REACT_APP_API_ROOT });

client.interceptors.request.use(config => ({
  ...config,
  headers: { "Content-Type": "application/json" },
  transformRequest: data => JSON.stringify(snakeCaseKeys(data))
}));

client.interceptors.response.use(({ data }) => camelCaseKeys(data));

export default {
  getPeople: () => client.get("/persons"),
  findPerson: email =>
    client.post("/persons/find", { person: { emailAddress: email } }),
  updatePerson: (id, person) => client.patch(`/persons/${id}`, { person })
};
