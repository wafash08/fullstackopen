import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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
      <div>
        <p>filter shown with</p>
        <input
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
        />
      </div>
      <form onSubmit={handleAddPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={e => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPerson.length <= 0 ? (
        <p>No person found</p>
      ) : (
        filteredPerson.map(person => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })
      )}
    </div>
  );
}

export default App;
