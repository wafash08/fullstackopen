/* eslint-disable react/prop-types */
function Header({ name }) {
  return <h1>{name}</h1>;
}

function Part({ part }) {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
}

function Content({ parts }) {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
}

function Total({ total }) {
  return <p>Total of {total} exercises</p>;
}

function Course({ course }) {
  const { name, parts } = course;
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={total} />
    </>
  );
}

function App() {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
}

export default App;
