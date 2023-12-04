/* eslint-disable react/prop-types */
function Person({ person, onDeletePerson }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p>
        {person.name} {person.number}
      </p>
      <button type='button' onClick={() => onDeletePerson(person.id)}>
        delete
      </button>
    </div>
  );
}

export default function Persons({ persons, onDeletePerson }) {
  return persons.map(person => (
    <Person person={person} key={person.id} onDeletePerson={onDeletePerson} />
  ));
}
