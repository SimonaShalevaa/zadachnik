import { solutionsLabel } from "../utils/format";

function StatusBadge({ status, solutions }) {
  if (status === "solved") return <span className="status status--solved">Решена</span>;
  if (status === "progress") {
    return <span className="status status--progress">{solutionsLabel(solutions)}</span>;
  }
  return <span className="status status--open">Без решение</span>;
}

export default StatusBadge;
