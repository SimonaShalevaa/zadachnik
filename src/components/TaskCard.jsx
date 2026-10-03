import Paper from "./Paper";
import SubjectTag from "./SubjectTag";
import StatusBadge from "./StatusBadge";

function TaskCard({ task }) {
  return (
    <article className="card task-card">
      <a href="#task" className="task-card__img">
        <Paper lines={task.preview} />
      </a>
      <div className="task-card__body">
        <div className="tags">
          <SubjectTag subject={task.subject} />
          <span className="tag">{task.grade} клас</span>
        </div>
        <h3>
          <a href="#task" title={task.title}>
            {task.title}
          </a>
        </h3>
        <div className="task-card__meta">
          <StatusBadge status={task.status} solutions={task.solutions} />
          <span>💬 {task.comments}</span>
          {task.time && <span>{task.time}</span>}
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
