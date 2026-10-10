import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { getTasks } from "../services/taskService";
import { subjects, grades } from "../data/tasks";

function CatalogPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("all");
  const [grade, setGrade] = useState("all");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [reloadCount]);

  function tryAgain() {
    setIsLoading(true);
    setError("");
    setReloadCount(reloadCount + 1);
  }

  const filteredTasks = tasks.filter((task) => {
    const subjectOk = subject === "all" || task.subject === subject;
    const gradeOk = grade === "all" || task.grade === Number(grade);
    return subjectOk && gradeOk;
  });

  return (
    <section>
      <div className="page-head">
        <h1>Всички задачи</h1>
        <p className="muted">Избери предмет и клас или разгледай най-новите задачи.</p>
      </div>

      <div className="filters">
        <div className="chips">
          <button className={subject === "all" ? "chip chip--active" : "chip"} onClick={() => setSubject("all")}>
            Всички
          </button>
          {Object.entries(subjects).map(([key, name]) => (
            <button
              key={key}
              className={subject === key ? "chip chip--active" : "chip"}
              onClick={() => setSubject(key)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="filters__selects">
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="all">Всички класове</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g} клас
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <p className="loading">Зареждане…</p>}

      {error && (
        <div className="form-alert">
          {error}{" "}
          <button className="link-btn" onClick={tryAgain}>
            Опитай отново
          </button>
        </div>
      )}

      {!isLoading && !error && filteredTasks.length === 0 && (
        <p className="muted">Няма задачи по този филтър.</p>
      )}

      <div className="grid">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default CatalogPage;
