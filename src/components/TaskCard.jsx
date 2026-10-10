import { Link } from "react-router";
import { subjects } from "../data/tasks";
import { formatDate } from "../utils/helpers";

const statusText = {
  open: "Без решение",
  progress: "Има решения",
  solved: "Решена",
};

function TaskCard({ task }) {
  return (
    <article className="card task-card">
      <Link to={"/tasks/" + task.id} className="task-card__img">
        <img src={task.image_url} alt={task.title} />
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
          <span className={"status status--" + task.status}>{statusText[task.status]}</span>
          <span>{formatDate(task.created_at)}</span>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
