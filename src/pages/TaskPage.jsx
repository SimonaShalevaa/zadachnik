import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Lightbox from "../components/Lightbox";
import SolutionForm from "../components/SolutionForm";
import NotFoundPage from "./NotFoundPage";
import { UserContext } from "../contexts/UserContext";
import { getTaskById, getSimilarTasks, deleteTask } from "../services/taskService";
import { subjects } from "../data/tasks";
import { getInitials, formatDate, cleanTags } from "../utils/helpers";

function TaskPage() {
  const { taskId } = useParams();
  const { user } = useContext(UserContext);

  const [result, setResult] = useState({ id: null, task: null, error: "" });
  const [similarTasks, setSimilarTasks] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTaskById(taskId)
      .then((task) => {
        setResult({ id: taskId, task: task, error: "" });
        if (task) {
          getSimilarTasks(task).then((data) => setSimilarTasks(data));
        }
      })
      .catch((err) => setResult({ id: taskId, task: null, error: err.message }));
  }, [taskId]);

  const isLoading = result.id !== taskId;
  const task = result.task;

  if (isLoading) {
    return <p className="loading">Зареждане…</p>;
  }

  if (result.error) {
    return <div className="form-alert">{result.error}</div>;
  }

  if (!task) {
    return <NotFoundPage />;
  }

  const authorName = task.author ? task.author.full_name : "Неизвестен";
  const tags = cleanTags(task.tags || "");
  const isOwner = user && user.id === task.author_id;

  async function handleDelete() {
    setIsDeleting(true);
    setDeleteError("");
    try {
      await deleteTask(task);
      navigate("/tasks");
    } catch (err) {
      setDeleteError(err.message);
      setIsDeleting(false);
    }
  }

  return (
    <section>
      <Link to="/tasks" className="back">
        ← Към всички задачи
      </Link>
      <div className="task-layout">
        <div>
          <article className="card task-detail">
            <div className="task-detail__head">
              <Link to={"/users/" + task.author_id} className="author">
                <span className="avatar avatar--sm">{getInitials(authorName)}</span>
                <div>
                  <strong>{authorName}</strong>
                  <small>{formatDate(task.created_at)}</small>
                </div>
              </Link>
            </div>
            <h1>{task.title}</h1>
            <div className="tags">
              <span className={"tag tag--" + task.subject}>{subjects[task.subject]}</span>
              <span className="tag">{task.grade} клас</span>
              {tags &&
                tags
                  .split(", ")
                  .map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
            </div>
            <div className="task-detail__img" onClick={() => setShowImage(true)}>
              <span className="task-detail__zoom">🔍 Увеличи</span>
              <img src={task.image_url} alt={task.title} className="task-detail__photo" />
            </div>
            {task.note && <p className="task-detail__note">{task.note}</p>}

            {isOwner && (
              <div className="task-detail__actions">
                {!confirmDelete ? (
                  <>
                    <Link to={"/tasks/" + task.id + "/edit"} className="btn btn--ghost">
                      ✎ Редактирай
                    </Link>
                    <button className="btn btn--ghost btn--danger" onClick={() => setConfirmDelete(true)}>
                      🗑 Изтрий
                    </button>
                  </>
                ) : (
                  <div className="confirm">
                    <span>Сигурна ли си, че искаш да изтриеш задачата?</span>
                    <button className="btn btn--danger-solid" onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? "Изтриване…" : "Да, изтрий"}
                    </button>
                    <button className="btn btn--ghost" onClick={() => setConfirmDelete(false)} disabled={isDeleting}>
                      Отказ
                    </button>
                  </div>
                )}
              </div>
            )}
            {deleteError && <div className="form-alert">{deleteError}</div>}
          </article>

          <h2 className="section-title">Решения</h2>
          <p className="muted">Още няма решения. Бъди първият, който ще помогне!</p>
          {user ? (
            <SolutionForm />
          ) : (
            <p className="muted">
              <Link to="/login" className="auth__link">
                Влез
              </Link>
              , за да напишеш решение.
            </p>
          )}
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

      {showImage && (
        <Lightbox title={task.title} imageUrl={task.image_url} onClose={() => setShowImage(false)} />
      )}
    </section>
  );
}

export default TaskPage;
