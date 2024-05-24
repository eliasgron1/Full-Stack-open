const Course = (props) => {
    const { course } = props
    console.log("Course")

    return (
        <div>
            <Header header_text={course.name} id={course.id} />
            <Content parts={course.parts} />
        </div>
    )
}


const Header = (props) => {
    const { id, header_text } = props
    console.log("Header")

    return (
        <h1>
            {id}. {header_text}
        </h1>
    )
}


const Content = (props) => {
    const { parts } = props
    console.log("Content")
    // console.log(parts)

    return (
        <div>
            <ul>
                {parts.map(part =>
                    <Part part={part} key={part.id} />
                )}
            </ul>
            <Total_Exercises parts={parts} />
        </div>
    )
}


const Part = (props) => {
    const { part } = props
    console.log("Part")

    return (
        <li>
            {part.id}. {part.name}, {part.exercises}
        </li>
    )
}


const Total_Exercises = (props) => {
    const { parts } = props
    const total_sum = parts.reduce(
        (acc, obj) => acc + obj.exercises, 0
    )

    return (
        <p>
            Total Exersises: {total_sum}
        </p>
    )
}

export default Course