import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddPerson = e => {
    e.preventDefault();
    const hasNewName = persons.find(person => person.name === newName);
    if (hasNewName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([
      ...persons,
      {
        name: newName,
      },
    ]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </div>
  );
}

export default App;
