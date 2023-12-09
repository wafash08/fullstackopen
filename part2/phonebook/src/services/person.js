import axios from "axios";
const baseURL = "/api/persons";

export async function getAllPersons() {
  const req = axios.get(baseURL);
  return req.then(res => res.data);
}

export async function createPerson(newPerson) {
  const req = axios.post(baseURL, newPerson);
  return req.then(res => res.data);
}

export async function deletePerson(personID) {
  return axios.delete(`${baseURL}/${personID}`);
}

export async function updatePerson(personID, changedPerson) {
  const req = axios.put(`${baseURL}/${personID}`, changedPerson);
  return req.then(res => res.data);
}
