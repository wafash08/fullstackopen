/* eslint-disable react/prop-types */
function Header({ name }) {
  return <h1>{name}</h1>;
}

function Part({ part, exercise }) {
  return (
    <p>
      {part} {exercise}
    </p>
  );
}

function Content({ part1, exercise1, part2, exercise2, part3, exercise3 }) {
  return (
    <div>
      <Part exercise={exercise1} part={part1} />
      <Part exercise={exercise2} part={part2} />
      <Part exercise={exercise3} part={part3} />
    </div>
  );
}

function Total({ total }) {
  return <p>Number of exercises {total}</p>;
}

function App() {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const total = exercises1 + exercises2 + exercises3;
  return (
    <div>
      <Header name={course} />
      <Content
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />
      <Total total={total} />
    </div>
  );
}

export default App;
