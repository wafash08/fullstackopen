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

function Notification({ notification }) {
  const { message, type } = notification;

  const baseStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const style =
    type === NOTIFICATION_TYPES["success"]
      ? { ...baseStyle, color: "green" }
      : { ...baseStyle, color: "red" };

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
}

const NOTIFICATION_TYPES = {
  success: "success",
  error: "error",
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: NOTIFICATION_TYPES["success"],
  });

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
      updatePerson(changedPerson.id, changedPerson)
        .then(res => {
          setPersons(
            persons.map(person =>
              person.id === changedPerson.id ? res : person
            )
          );
          setNotification({
            message: `Succesfully changed ${res.name}`,
            type: NOTIFICATION_TYPES["success"],
          });
          setTimeout(() => {
            setNotification({
              message: null,
            });
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch(() => {
          setNotification({
            message: `Information of ${hasNewName.name} has already been removed from server`,
            type: NOTIFICATION_TYPES["error"],
          });
          setTimeout(() => {
            setNotification({
              message: null,
            });
          }, 3000);
          setPersons(persons.filter(person => person.id !== hasNewName.id));
          setNewName("");
          setNewNumber("");
        });
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    createPerson(newPerson)
      .then(person => {
        setPersons([...persons, person]);
        setNotification({
          message: `Added ${person.name}`,
          type: NOTIFICATION_TYPES["success"],
        });
        setTimeout(() => {
          setNotification({
            message: null,
          });
        }, 3000);
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        if (error.response) {
          setNotification({
            message: error.response.data.error,
            type: NOTIFICATION_TYPES["error"],
          });
          setTimeout(() => {
            setNotification({
              message: null,
            });
          }, 3000);
        }
      });
  };

  console.log("notification.message >> ", notification.message);

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
      <Notification notification={notification} />
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
