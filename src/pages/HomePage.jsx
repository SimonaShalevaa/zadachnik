import TaskCard from "../components/TaskCard";
import BlogCard from "../components/BlogCard";
import HeroStats from "../components/HeroStats";
import SectionHead from "../components/SectionHead";
import Chips from "../components/Chips";
import { TASKS, SITE_STATS, SORT_OPTIONS } from "../data/tasks";
import { SUBJECTS, GRADES } from "../data/subjects";
import { HOME_POST_SLUGS, getPost } from "../data/posts";

function HomePage() {
  const subjectChips = ["Всички", ...SUBJECTS.map((s) => s.label)];
  const homePosts = HOME_POST_SLUGS.map(getPost);

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
        <HeroStats stats={SITE_STATS} />
      </div>
      <div className="filters">
        <Chips items={subjectChips} active="Всички" />
        <div className="filters__selects">
          <select>
            <option>Всички класове</option>
            {GRADES.map((grade) => (
              <option key={grade}>{grade} клас</option>
            ))}
          </select>
          <select>
            {SORT_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid">
        {TASKS.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="pagination">
        <button className="btn btn--ghost">Зареди още</button>
      </div>
      <SectionHead title="От блога" linkHref="#blog" linkLabel="Всички статии →" />
      <div className="blog-grid">
        {homePosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
