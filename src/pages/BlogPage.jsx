import BlogCard from "../components/BlogCard";
import BlogFeatured from "../components/BlogFeatured";
import Chips from "../components/Chips";
import { POSTS, BLOG_CATEGORIES } from "../data/posts";

function Newsletter() {
  return (
    <div className="card newsletter">
      <div>
        <h3>📬 Нови статии всяка седмица</h3>
        <p className="muted">Кратко, полезно и без спам. Отписваш се с един клик.</p>
      </div>
      <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="твоят имейл" />
        <button type="submit" className="btn btn--primary">
          Абонирай се
        </button>
      </form>
    </div>
  );
}

function BlogPage() {
  const featured = POSTS.find((post) => post.featured);
  const others = POSTS.filter((post) => !post.featured);

  return (
    <section id="blog" className="view">
      <div className="blog-head">
        <h1>Блог</h1>
        <p className="muted">Обяснения, трикове и съвети за учене – написани от ученици и учители.</p>
      </div>
      <BlogFeatured post={featured} symbol="∑" />
      <Chips items={BLOG_CATEGORIES} active="Всички" className="blog-chips" />
      <div className="blog-grid">
        {others.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="pagination">
        <button className="btn btn--ghost">Още статии</button>
      </div>
      <Newsletter />
    </section>
  );
}

export default BlogPage;
