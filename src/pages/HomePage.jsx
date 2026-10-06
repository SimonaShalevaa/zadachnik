import TaskCard from "../components/TaskCard";
import BlogCard from "../components/BlogCard";
import { tasks, stats, subjects, grades } from "../data/tasks";
import { posts } from "../data/posts";

function HomePage() {
  return (
    <section id="home" className="view">
      <div className="hero">
        <div>
          <h1>Заседна на задача?</h1>
          <p>
            Снимай условието, качи го и някой от съучениците ти ще помогне. Или реши чужда задача и
            събери точки.
          </p>
          <a href="#how" className="hero__link">
            Как работи? →
          </a>
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
      <div className="pagination">
        <button className="btn btn--ghost">Зареди още</button>
      </div>

      <div className="section-head">
        <h2>От блога</h2>
        <a href="#blog" className="section-head__link">
          Всички статии →
        </a>
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
