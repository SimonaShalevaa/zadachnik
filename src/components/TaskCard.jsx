import { Link } from "react-router";
import Paper from "./Paper";
import { subjects } from "../data/tasks";

function TaskCard({ task }) {
  let statusText = "Без решение";
  if (task.status === "solved") {
    statusText = "Решена";
  } else if (task.status === "progress") {
    statusText = task.solutions === 1 ? "1 решение" : task.solutions + " решения";
  }

  return (
    <article className="card task-card">
      <Link to={"/tasks/" + task.id} className="task-card__img">
        <Paper lines={task.text} />
      </Link>
      <div className="task-card__body">
        <div className="tags">
          <span className={"tag tag--" + task.subject}>{subjects[task.subject]}</span>
          <span className="tag">{task.grade} клас</span>
        </div>
        <h3>
          <Link to={"/tasks/" + task.id}>{task.title}</Link>
        </h3>
        <div className="task-card__meta">
          <span className={"status status--" + task.status}>{statusText}</span>
          <span>💬 {task.comments}</span>
          {task.time && <span>{task.time}</span>}
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
