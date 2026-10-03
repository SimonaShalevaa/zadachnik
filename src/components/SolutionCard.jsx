import { Fragment } from "react";
import Avatar from "./Avatar";
import Paper from "./Paper";
import { getUser } from "../data/users";
import { formatPoints } from "../utils/format";

function SolutionCard({ solution }) {
  const author = getUser(solution.authorId);
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
            <Avatar user={author} />
            <div>
              <strong>{author.name}</strong>
              <small>
                ⭐ {formatPoints(author.points)} т. · {solution.time}
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
        <details className="spoiler" open={solution.open}>
          <summary>📝 Пълно решение</summary>
          <p>
            {solution.lines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
            {solution.result && <strong>{solution.result}</strong>}
          </p>
          {solution.paper && <Paper lines={[solution.paper]} size="sm" />}
        </details>
        <div className="solution__footer">
          <button className="link-btn">💬 Коментари ({solution.comments})</button>
          <button className="link-btn">
            {solution.best ? "🙏 Благодаря" : "✓ Маркирай като най-добро"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default SolutionCard;
