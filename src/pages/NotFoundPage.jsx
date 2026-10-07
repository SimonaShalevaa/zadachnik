import { Link } from "react-router";
import Paper from "../components/Paper";

function NotFoundPage() {
  return (
    <section>
      <div className="not-found">
        <Paper lines={["404 = x", "x ∉ ℝ"]} className="not-found__paper" />
        <h1>Тази страница я няма</h1>
        <p className="muted">
          Като уравнение без решение – търсихме навсякъде, но не я намерихме. Може би адресът е сгрешен.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            Към задачите
          </Link>
          <Link to="/blog" className="btn btn--ghost">
            Към блога
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
