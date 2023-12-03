/* eslint-disable react/prop-types */
function Person({ person }) {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
}

export default function Persons({ persons }) {
  return persons.map(person => <Person person={person} key={person.name} />);
}
