import { useEffect, useState } from "react";
import { Link } from "react-router";
import TaskCard from "../components/TaskCard";
import BlogCard from "../components/BlogCard";
import { getLatestTasks } from "../services/taskService";
import { stats } from "../data/tasks";
import { posts } from "../data/posts";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLatestTasks(3)
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <div className="hero">
        <div>
          <h1>Заседна на задача?</h1>
          <p>
            Снимай условието, качи го и някой от съучениците ти ще помогне. Или реши чужда задача и
            събери точки.
          </p>
          <Link to="/how-it-works" className="hero__link">
            Как работи? →
          </Link>
        </div>
        <div className="hero__stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-head">
        <h2>Най-нови задачи</h2>
        <Link to="/tasks" className="section-head__link">
          Всички задачи →
        </Link>
      </div>
      {isLoading && <p className="loading">Зареждане…</p>}
      {error && <div className="form-alert">{error}</div>}
      {!isLoading && !error && tasks.length === 0 && (
        <p className="muted">Още няма качени задачи. Бъди първият!</p>
      )}
      <div className="grid">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="section-head">
        <h2>От блога</h2>
        <Link to="/blog" className="section-head__link">
          Всички статии →
        </Link>
      </div>
      <div className="blog-grid">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
