export function formatPoints(points) {
  return String(points).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function solutionsLabel(count) {
  return count === 1 ? "1 решение" : `${count} решения`;
}
