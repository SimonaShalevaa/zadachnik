import { postAuthor } from "../data/posts";

function BlogCard({ post }) {
  return (
    <article className="card blog-card">
      <a href="#article" className={`blog-card__cover blog-card__cover--${post.cover}`}>
        <span>{post.symbol}</span>
      </a>
      <div className="blog-card__body">
        <span className="blog-card__cat">{post.category}</span>
        <h3>
          <a href="#article">{post.title}</a>
        </h3>
        <p>{post.excerpt}</p>
        <div className="blog-card__meta">
          <span>{postAuthor(post).name}</span>
          <span>· {post.readTime} мин четене</span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
