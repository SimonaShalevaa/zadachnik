import Paper from "./Paper";

function SolutionCard({ solution }) {
  const { author } = solution;

  return (
    <article className={solution.best ? "card solution solution--best" : "card solution"}>
      <div className="solution__votes">
        <button className="vote">▲</button>
        <strong>{solution.votes}</strong>
        <button className="vote">▼</button>
      </div>
      <div className="solution__body">
        <div className="solution__head">
          <div className="author">
            <span className={author.pink ? "avatar avatar--sm avatar--alt" : "avatar avatar--sm"}>
              {author.initials}
            </span>
            <div>
              <strong>{author.name}</strong>
              <small>
                ⭐ {author.points} т. · {solution.time}
              </small>
            </div>
          </div>
          {solution.best && <span className="badge-best">✓ Най-добро решение</span>}
        </div>

        {solution.hint && (
          <details className="spoiler">
            <summary>💡 Подсказка (опитай първо сам)</summary>
            <p>{solution.hint}</p>
          </details>
        )}

        <details className="spoiler">
          <summary>📝 Пълно решение</summary>
          {solution.text.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          {solution.paper && <Paper lines={[solution.paper]} className="paper--sm" />}
        </details>

        <div className="solution__footer">
          <button className="link-btn">💬 Коментари ({solution.comments})</button>
          <button className="link-btn">{solution.best ? "🙏 Благодаря" : "✓ Маркирай като най-добро"}</button>
        </div>
      </div>
    </article>
  );
}

export default SolutionCard;
