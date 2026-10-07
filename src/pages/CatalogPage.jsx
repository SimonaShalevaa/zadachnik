import TaskCard from "../components/TaskCard";
import { tasks, subjects, grades } from "../data/tasks";

function CatalogPage() {
  return (
    <section>
      <div className="page-head">
        <h1>Всички задачи</h1>
        <p className="muted">Избери предмет и клас или разгледай най-новите задачи.</p>
      </div>

      <div className="filters">
        <div className="chips">
          <button className="chip chip--active">Всички</button>
          {Object.values(subjects).map((name) => (
            <button className="chip" key={name}>
              {name}
            </button>
          ))}
        </div>
        <div className="filters__selects">
          <select>
            <option>Всички класове</option>
            {grades.map((grade) => (
              <option key={grade}>{grade} клас</option>
            ))}
          </select>
          <select>
            <option>Най-нови</option>
            <option>Без решение</option>
            <option>Най-популярни</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default CatalogPage;
