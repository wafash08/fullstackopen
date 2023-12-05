/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Filter from "./components/filter";
import AddPersonForm from "./components/add-person-form";
import Persons from "./components/persons";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/person";

function Notification({ message }) {
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
}

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAllPersons().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddPerson = e => {
    e.preventDefault();
    const hasNewName = persons.find(person => person.name === newName);

    if (hasNewName) {
      const hasConfirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number to the new one?`
      );

      if (!hasConfirmation) {
        return;
      }

      const changedPerson = { ...hasNewName, number: newNumber };
      updatePerson(changedPerson.id, changedPerson).then(res => {
        setPersons(
          persons.map(person => (person.id === changedPerson.id ? res : person))
        );
        setNotification(`Succesfully changed ${res.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
      });
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    createPerson(newPerson).then(person => {
      setPersons([...persons, person]);
      setNotification(`Added ${person.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDeletePerson = personID => {
    const personToDelete = persons.find(person => person.id === personID);
    const hasConfirmation = window.confirm(
      `Do you want to delete ${personToDelete.name}?`
    );
    if (hasConfirmation) {
      deletePerson(personID);
      const personsWithoutDeletedPerson = persons.filter(
        person => person.id !== personID
      );
      setPersons(personsWithoutDeletedPerson);
    }
  };

  let filteredPerson = filterName
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter
        filterName={filterName}
        onFilterName={e => setFilterName(e.target.value)}
      />
      <AddPersonForm
        newName={newName}
        newNumber={newNumber}
        onAddPerson={handleAddPerson}
        onNewName={e => setNewName(e.target.value)}
        onNewNumber={e => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      {filteredPerson.length <= 0 ? (
        <p>No person found</p>
      ) : (
        <Persons persons={filteredPerson} onDeletePerson={handleDeletePerson} />
      )}
    </div>
  );
}

export default App;
