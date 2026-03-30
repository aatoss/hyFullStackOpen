const App = () => {
  const course = {name: 'Half Stack application development', parts: [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]}

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Part parts={course.parts} />
    </div>
  )
}

export default App

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
}

const Part = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum + p.exercises, 0)
  return <p>Total of {total} exercises</p>
}