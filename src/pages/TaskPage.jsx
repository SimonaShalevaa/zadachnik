import { useState } from "react";
import Paper from "../components/Paper";
import Lightbox from "../components/Lightbox";
import SolutionCard from "../components/SolutionCard";
import SolutionForm from "../components/SolutionForm";
import { taskDetails, solutions, similarTasks, subjects } from "../data/tasks";

function TaskPage() {
  const [showImage, setShowImage] = useState(false);
  const task = taskDetails;

  return (
    <section id="task" className="view">
      <a href="#home" className="back">
        ← Към всички задачи
      </a>
      <div className="task-layout">
        <div>
          <article className="card task-detail">
            <div className="task-detail__head">
              <div className="author">
                <span className="avatar avatar--sm">{task.author.initials}</span>
                <div>
                  <strong>{task.author.name}</strong>
                  <small>
                    {task.grade} клас · {task.time}
                  </small>
                </div>
              </div>
              <span className="status status--progress">{task.solutions} решения</span>
            </div>
            <h1>{task.title}</h1>
            <div className="tags">
              <span className={"tag tag--" + task.subject}>{subjects[task.subject]}</span>
              <span className="tag">{task.grade} клас</span>
              {task.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="task-detail__img" onClick={() => setShowImage(true)}>
              <span className="task-detail__zoom">🔍 Увеличи</span>
              <Paper lines={task.text} className="paper--lg" />
            </div>
            <p className="task-detail__note">{task.note}</p>
            <div className="task-detail__actions">
              <button className="btn btn--ghost">🔖 Запази</button>
              <button className="btn btn--ghost">↗ Сподели</button>
              <button className="btn btn--ghost btn--danger">⚑ Докладвай</button>
            </div>
          </article>

          <h2 className="section-title">
            Решения <span>({solutions.length})</span>
          </h2>
          {solutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
          <SolutionForm />
        </div>

        <aside className="sidebar">
          <div className="card side-box">
            <h3>Подобни задачи</h3>
            <ul className="side-list">
              {similarTasks.map((item) => (
                <li key={item.id}>
                  <a href="#task">{item.title}</a>
                  <span className="tag">{item.grade} кл.</span>
                </li>
              ))}
            </ul>
          </div>
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

      {showImage && <Lightbox title={task.title} lines={task.text} onClose={() => setShowImage(false)} />}
    </section>
  );
}

export default TaskPage;
