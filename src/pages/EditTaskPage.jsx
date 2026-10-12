import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import TaskForm from "../components/TaskForm";
import NotFoundPage from "./NotFoundPage";
import { UserContext } from "../contexts/UserContext";
import { getTaskById, updateTask } from "../services/taskService";

function EditTaskPage() {
  const { taskId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [result, setResult] = useState({ id: null, task: null, error: "" });

  useEffect(() => {
    getTaskById(taskId)
      .then((task) => setResult({ id: taskId, task: task, error: "" }))
      .catch((err) => setResult({ id: taskId, task: null, error: err.message }));
  }, [taskId]);

  if (result.id !== taskId) {
    return <p className="loading">Зареждане…</p>;
  }

  if (result.error) {
    return <div className="form-alert">{result.error}</div>;
  }

  const task = result.task;
  if (!task) {
    return <NotFoundPage />;
  }

  if (task.author_id !== user.id) {
    return <Navigate to={"/tasks/" + task.id} replace />;
  }

  async function handleUpdate(values, file) {
    await updateTask(task, values, file, user.id);
    navigate("/tasks/" + task.id);
  }

  const initialValues = {
    title: task.title,
    subject: task.subject,
    grade: String(task.grade),
    note: task.note || "",
    tags: task.tags || "",
  };

  return (
    <section>
      <div className="narrow">
        <h1>Редактирай задачата</h1>
        <p className="muted">Промени каквото е нужно и запази. Ако не избереш нова снимка, остава старата.</p>
        <TaskForm
          initialValues={initialValues}
          initialImage={task.image_url}
          imageRequired={false}
          submitText="Запази промените"
          sendingText="Запазване…"
          cancelTo={"/tasks/" + task.id}
          onSubmit={handleUpdate}
        />
      </div>
    </section>
  );
}

export default EditTaskPage;
