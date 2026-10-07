import { Link } from "react-router";
import TaskCard from "../components/TaskCard";
import BlogCard from "../components/BlogCard";
import { tasks, stats } from "../data/tasks";
import { posts } from "../data/posts";

function HomePage() {
  const latestTasks = tasks.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

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
      <div className="grid">
        {latestTasks.map((task) => (
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
        {latestPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
