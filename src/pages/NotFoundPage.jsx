import Paper from "../components/Paper";

function NotFoundPage() {
  return (
    <section id="not-found" className="view">
      <div className="not-found">
        <Paper lines={["404 = x", "x ∉ ℝ"]} className="not-found__paper" />
        <h1>Тази страница я няма</h1>
        <p className="muted">
          Като уравнение без решение – търсихме навсякъде, но не я намерихме. Може би адресът е сгрешен.
        </p>
        <div className="not-found__actions">
          <a href="#home" className="btn btn--primary">
            Към задачите
          </a>
          <a href="#blog" className="btn btn--ghost">
            Към блога
          </a>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
