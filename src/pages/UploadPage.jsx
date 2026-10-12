import { useContext } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import { UserContext } from "../contexts/UserContext";
import { createTask } from "../services/taskService";

const emptyTask = {
  title: "",
  subject: "math",
  grade: "8",
  note: "",
  tags: "",
};

function UploadPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleCreate(values, file) {
    const task = await createTask(values, file, user.id);
    navigate("/tasks/" + task.id);
  }

  return (
    <section>
      <div className="narrow">
        <h1>Качи нова задача</h1>
        <p className="muted">Снимай условието ясно и на добра светлина.</p>
        <TaskForm
          initialValues={emptyTask}
          imageRequired={true}
          submitText="Публикувай"
          sendingText="Публикуване…"
          cancelTo="/tasks"
          onSubmit={handleCreate}
        />
      </div>
    </section>
  );
}

export default UploadPage;
