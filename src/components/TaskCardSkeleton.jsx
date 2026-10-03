function TaskCardSkeleton() {
  return (
    <div className="card task-card skeleton-card">
      <div className="skeleton skeleton--img" />
      <div className="task-card__body">
        <div className="skeleton-row">
          <span className="skeleton skeleton--pill" />
          <span className="skeleton skeleton--pill skeleton--short" />
        </div>
        <span className="skeleton skeleton--line" />
        <span className="skeleton skeleton--line skeleton--w60" />
        <span className="skeleton skeleton--line skeleton--w40" />
      </div>
    </div>
  );
}

export default TaskCardSkeleton;
