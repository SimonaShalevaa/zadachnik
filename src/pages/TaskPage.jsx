import { useCallback, useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Paper from "../components/Paper";
import SubjectTag from "../components/SubjectTag";
import StatusBadge from "../components/StatusBadge";
import SolutionCard from "../components/SolutionCard";
import SolutionForm from "../components/SolutionForm";
import SideBox from "../components/SideBox";
import SideTaskList from "../components/SideTaskList";
import RulesList from "../components/RulesList";
import Lightbox from "../components/Lightbox";
import { TASK_DETAIL, SOLUTIONS, SIMILAR_TASKS, TASK_RULES } from "../data/tasks";
import { getUser } from "../data/users";

function TaskPage() {
  const task = TASK_DETAIL;
  const author = getUser(task.authorId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    window.addEventListener("hashchange", closeLightbox);
    return () => window.removeEventListener("hashchange", closeLightbox);
  }, [closeLightbox]);

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
                <Avatar user={author} />
                <div>
                  <strong>{author.name}</strong>
                  <small>
                    {task.grade} клас · {task.time}
                  </small>
                </div>
              </div>
              <StatusBadge status={task.status} solutions={task.solutions} />
            </div>
            <h1>{task.title}</h1>
            <div className="tags">
              <SubjectTag subject={task.subject} />
              <span className="tag">{task.grade} клас</span>
              {task.extraTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="task-detail__img"
              role="button"
              tabIndex={0}
              aria-label="Отвори снимката на цял екран"
              onClick={openLightbox}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openLightbox()}
            >
              <span className="task-detail__zoom">🔍 Увеличи</span>
              <Paper lines={task.image} size="lg" />
            </div>
            <p className="task-detail__note">{task.note}</p>
            <div className="task-detail__actions">
              <button className="btn btn--ghost">🔖 Запази</button>
              <button className="btn btn--ghost">↗ Сподели</button>
              <button className="btn btn--ghost btn--danger">⚑ Докладвай</button>
            </div>
          </article>
          <h2 className="section-title">
            Решения <span>({SOLUTIONS.length})</span>
          </h2>
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
          <SolutionForm />
        </div>
        <aside className="sidebar">
          <SideBox title="Подобни задачи">
            <SideTaskList tasks={SIMILAR_TASKS} />
          </SideBox>
          <SideBox title="Правила">
            <RulesList rules={TASK_RULES} />
          </SideBox>
        </aside>
      </div>
      {lightboxOpen && <Lightbox title={task.title} lines={task.image} onClose={closeLightbox} />}
    </section>
  );
}

export default TaskPage;
