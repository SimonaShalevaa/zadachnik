import Avatar from "./Avatar";
import { postAuthor } from "../data/posts";

function BlogFeatured({ post, symbol }) {
  const author = postAuthor(post);
  return (
    <article className="card blog-featured">
      <a href="#article" className={`blog-featured__cover blog-card__cover--${post.cover}`}>
        <span>{symbol ?? post.symbol}</span>
      </a>
      <div className="blog-featured__body">
        <span className="badge-featured">★ Избрана статия</span>
        <span className="blog-card__cat">{post.category}</span>
        <h2>
          <a href="#article">{post.title}</a>
        </h2>
        <p className="muted">{post.description}</p>
        <div className="author">
          <Avatar user={author} />
          <div>
            <strong>{author.name}</strong>
            <small>
              {post.date} · {post.readTime} мин четене
            </small>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogFeatured;
