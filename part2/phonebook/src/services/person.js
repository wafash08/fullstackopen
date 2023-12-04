import axios from "axios";
const baseURL = "http://localhost:3001/persons";

export async function getAllPersons() {
  const req = axios.get(baseURL);
  return req.then(res => res.data);
}

export async function createPerson(newPerson) {
  const req = axios.post(baseURL, newPerson);
  return req.then(res => res.data);
}
