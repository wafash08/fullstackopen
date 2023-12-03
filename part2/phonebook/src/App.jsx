import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import AddPersonForm from "./components/add-person-form";
import Persons from "./components/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/persons")
      .then(response => setPersons(response.data));
  }, []);

  const handleAddPerson = e => {
    e.preventDefault();
    const hasNewName = persons.find(person => person.name === newName);
    if (hasNewName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  const filteredPerson = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  console.log("filteredPerson >> ", filteredPerson);

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
