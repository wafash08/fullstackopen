import { useState, useEffect } from "react";
import Filter from "./components/filter";
import AddPersonForm from "./components/add-person-form";
import Persons from "./components/persons";
import { createPerson, getAllPersons } from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    getAllPersons().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddPerson = e => {
    e.preventDefault();
    const hasNewName = persons.find(person => person.name === newName);
    if (hasNewName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    createPerson(newPerson).then(person => {
      console.log(person);
      setPersons([...persons, person]);
      setNewName("");
      setNewNumber("");
    });
  };

  let filteredPerson = filterName
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
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
        <Persons persons={filteredPerson} />
      )}
    </div>
  );
}

export default App;
