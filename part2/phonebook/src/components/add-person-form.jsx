/* eslint-disable react/prop-types */
export default function AddPersonForm({
  onAddPerson,
  newName,
  onNewName,
  newNumber,
  onNewNumber,
}) {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name: <input value={newName} onChange={onNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNewNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
}
