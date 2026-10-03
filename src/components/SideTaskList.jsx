function SideTaskList({ tasks, className = "" }) {
  return (
    <ul className={`side-list ${className}`.trim()}>
      {tasks.map((task) => (
        <li key={task.id}>
          <a href="#task">{task.title}</a>
          <span className="tag">{task.grade} кл.</span>
        </li>
      ))}
    </ul>
  );
}

export default SideTaskList;
