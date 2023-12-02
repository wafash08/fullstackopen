/* eslint-disable react/prop-types */
function Header({ course }) {
  return <h1>{course}</h1>;
}

function Part({ name, exercise }) {
  return (
    <p>
      {name} {exercise}
    </p>
  );
}

function Content({ part1, part2, part3 }) {
  return (
    <div>
      <Part exercise={part1.exercises} name={part1.name} />
      <Part exercise={part2.exercises} name={part2.name} />
      <Part exercise={part3.exercises} name={part3.name} />
    </div>
  );
}

function Total({ total }) {
  return <p>Number of exercises {total}</p>;
}

function App() {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const total = part1.exercises + part2.exercises + part3.exercises;
  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={total} />
    </div>
  );
}

export default App;
