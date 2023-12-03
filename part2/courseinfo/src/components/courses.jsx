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
      {parts.map(part => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
}

function Total({ total }) {
  return <p>Total of {total} exercises</p>;
}

function Course({ course }) {
  const { name, parts } = course;
  const total = parts.reduce((sum, current) => {
    return sum + current.exercises;
  }, 0);
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={total} />
    </>
  );
}

export default function Courses({ courses }) {
  return courses.map(course => {
    return <Course key={course.id} course={course} />;
  });
}
