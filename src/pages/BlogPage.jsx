import { Link } from "react-router";
import BlogCard from "../components/BlogCard";
import { posts, categories } from "../data/posts";

function BlogPage() {
  const featured = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <section>
      <div className="blog-head">
        <h1>Блог</h1>
        <p className="muted">Обяснения, трикове и съвети за учене – написани от ученици и учители.</p>
      </div>

      <article className="card blog-featured">
        <Link to="/blog/1" className={"blog-featured__cover blog-card__cover--" + featured.cover}>
          <span>∑</span>
        </Link>
        <div className="blog-featured__body">
          <span className="badge-featured">★ Избрана статия</span>
          <span className="blog-card__cat">{featured.category}</span>
          <h2>
            <Link to="/blog/1">{featured.title}</Link>
          </h2>
          <p className="muted">{featured.excerpt}</p>
          <div className="author">
            <span className="avatar avatar--sm avatar--alt">ЕК</span>
            <div>
              <strong>{featured.author}</strong>
              <small>12 септ. 2026 · {featured.readTime} мин четене</small>
            </div>
          </div>
        </div>
      </article>

      <div className="chips blog-chips">
        {categories.map((category, index) => (
          <button className={index === 0 ? "chip chip--active" : "chip"} key={category}>
            {category}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {otherPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="card newsletter">
        <div>
          <h3>📬 Нови статии всяка седмица</h3>
          <p className="muted">Кратко, полезно и без спам. Отписваш се с един клик.</p>
        </div>
        <form className="newsletter__form">
          <input type="email" placeholder="твоят имейл" />
          <button type="button" className="btn btn--primary">
            Абонирай се
          </button>
        </form>
      </div>
    </section>
  );
}

export default BlogPage;
