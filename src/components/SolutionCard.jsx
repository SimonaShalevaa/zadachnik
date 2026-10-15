import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { deleteSolution, likeSolution, unlikeSolution } from "../services/solutionService";
import { getInitials, formatDate } from "../utils/helpers";

function SolutionCard({ solution, isOwner, onDeleted }) {
  const { user } = useContext(UserContext);

  const [likes, setLikes] = useState(solution.likes || []);
  const [isLiking, setIsLiking] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const authorName = solution.author ? solution.author.full_name : "Неизвестен";
  const points = solution.author ? solution.author.points : 0;

  const isLiked = user && likes.some((like) => like.user_id === user.id);
  const canLike = user && !isOwner;

  let likeTitle = "";
  if (!user) {
    likeTitle = "Влез, за да харесаш";
  } else if (isOwner) {
    likeTitle = "Не можеш да харесаш свое решение";
  }

  async function handleLike() {
    setIsLiking(true);
    setError("");
    try {
      if (isLiked) {
        await unlikeSolution(solution.id, user.id);
        setLikes(likes.filter((like) => like.user_id !== user.id));
      } else {
        await likeSolution(solution.id, user.id);
        setLikes([...likes, { user_id: user.id }]);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLiking(false);
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError("");
    try {
      await deleteSolution(solution);
      onDeleted(solution.id);
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
    }
  }

  return (
    <article className={solution.is_best ? "card solution solution--best" : "card solution"}>
      <div className="solution__body">
        <div className="solution__head">
          <Link to={"/users/" + solution.author_id} className="author">
            <span className="avatar avatar--sm">{getInitials(authorName)}</span>
            <div>
              <strong>{authorName}</strong>
              <small>
                ⭐ {points} т. · {formatDate(solution.created_at)}
              </small>
            </div>
          </Link>
          {solution.is_best && <span className="badge-best">✓ Най-добро решение</span>}
        </div>

        {solution.hint && (
          <details className="spoiler">
            <summary>💡 Подсказка (опитай първо сам)</summary>
            <p>{solution.hint}</p>
          </details>
        )}

        <details className="spoiler">
          <summary>📝 Пълно решение</summary>
          {solution.text.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          {solution.image_url && (
            <a href={solution.image_url} target="_blank" rel="noreferrer">
              <img src={solution.image_url} alt="Снимка на решението" className="solution__photo" />
            </a>
          )}
        </details>

        <div className="solution__footer">
          <button
            className={isLiked ? "like-btn like-btn--active" : "like-btn"}
            onClick={handleLike}
            disabled={!canLike || isLiking}
            title={likeTitle}
          >
            👍 Полезно <strong>{likes.length}</strong>
          </button>

          {isOwner &&
            (!confirmDelete ? (
              <button className="btn btn--ghost btn--danger" onClick={() => setConfirmDelete(true)}>
                🗑 Изтрий
              </button>
            ) : (
              <div className="confirm">
                <span>Да изтрия ли решението?</span>
                <button className="btn btn--danger-solid" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Изтриване…" : "Да, изтрий"}
                </button>
                <button className="btn btn--ghost" onClick={() => setConfirmDelete(false)} disabled={isDeleting}>
                  Отказ
                </button>
              </div>
            ))}
        </div>
        {error && <div className="form-alert">{error}</div>}
      </div>
    </article>
  );
}

export default SolutionCard;
