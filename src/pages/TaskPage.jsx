import { useState } from "react";
import { Link, useParams } from "react-router";
import Paper from "../components/Paper";
import Lightbox from "../components/Lightbox";
import SolutionCard from "../components/SolutionCard";
import SolutionForm from "../components/SolutionForm";
import NotFoundPage from "./NotFoundPage";
import { tasks, solutions, subjects } from "../data/tasks";
import { users } from "../data/users";

function TaskPage() {
  const { taskId } = useParams();
  const [showImage, setShowImage] = useState(false);

  const task = tasks.find((t) => t.id === Number(taskId));
  if (!task) {
    return <NotFoundPage />;
  }

  const author = users.find((u) => u.id === task.authorId);
  const taskSolutions = solutions.filter((s) => s.taskId === task.id);
  const similarTasks = tasks.filter((t) => t.subject === task.subject && t.id !== task.id).slice(0, 3);
  const image = task.fullText || task.text;

  return (
    <section>
      <Link to="/tasks" className="back">
        ← Към всички задачи
      </Link>
      <div className="task-layout">
        <div>
          <article className="card task-detail">
            <div className="task-detail__head">
              <Link to={"/users/" + author.id} className="author">
                <span className={author.pink ? "avatar avatar--sm avatar--alt" : "avatar avatar--sm"}>
                  {author.initials}
                </span>
                <div>
                  <strong>{author.name}</strong>
                  <small>
                    {task.grade} клас · {task.time}
                  </small>
                </div>
              </Link>
              <span className={"status status--" + task.status}>
                {task.status === "solved" ? "Решена" : task.solutions + " решения"}
              </span>
            </div>
            <h1>{task.title}</h1>
            <div className="tags">
              <span className={"tag tag--" + task.subject}>{subjects[task.subject]}</span>
              <span className="tag">{task.grade} клас</span>
              {task.tags &&
                task.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
            </div>
            <div className="task-detail__img" onClick={() => setShowImage(true)}>
              <span className="task-detail__zoom">🔍 Увеличи</span>
              <Paper lines={image} className="paper--lg" />
            </div>
            {task.note && <p className="task-detail__note">{task.note}</p>}
            <div className="task-detail__actions">
              <button className="btn btn--ghost">🔖 Запази</button>
              <button className="btn btn--ghost">↗ Сподели</button>
              <button className="btn btn--ghost btn--danger">⚑ Докладвай</button>
            </div>
          </article>

          <h2 className="section-title">
            Решения <span>({taskSolutions.length})</span>
          </h2>
          {taskSolutions.length === 0 && <p className="muted">Още няма решения. Бъди първият, който ще помогне!</p>}
          {taskSolutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
          <SolutionForm />
        </div>

        <aside className="sidebar">
          {similarTasks.length > 0 && (
            <div className="card side-box">
              <h3>Подобни задачи</h3>
              <ul className="side-list">
                {similarTasks.map((item) => (
                  <li key={item.id}>
                    <Link to={"/tasks/" + item.id}>{item.title}</Link>
                    <span className="tag">{item.grade} кл.</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="card side-box">
            <h3>Правила</h3>
            <ul className="rules">
              <li>Обяснявай, не само давай отговор.</li>
              <li>Бъди учтив в коментарите.</li>
              <li>Не качвай задачи от текущи контролни.</li>
            </ul>
          </div>
        </aside>
      </div>

      {showImage && <Lightbox title={task.title} lines={image} onClose={() => setShowImage(false)} />}
    </section>
  );
}

export default TaskPage;
