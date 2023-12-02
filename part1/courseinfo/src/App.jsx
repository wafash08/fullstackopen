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

function Content({ parts }) {
  return (
    <div>
      <Part exercise={parts[0].exercises} name={parts[0].name} />
      <Part exercise={parts[1].exercises} name={parts[1].name} />
      <Part exercise={parts[2].exercises} name={parts[2].name} />
    </div>
  );
}

function Total({ parts }) {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {total}</p>;
}

function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
