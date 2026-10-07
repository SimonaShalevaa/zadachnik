import { Link } from "react-router";

function BlogCard({ post }) {
  return (
    <article className="card blog-card">
      <Link to={"/blog/" + post.id} className={"blog-card__cover blog-card__cover--" + post.cover}>
        <span>{post.symbol}</span>
      </Link>
      <div className="blog-card__body">
        <span className="blog-card__cat">{post.category}</span>
        <h3>
          <Link to={"/blog/" + post.id}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="blog-card__meta">
          <span>{post.author}</span>
          <span>· {post.readTime} мин четене</span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
