function EmptyState({ icon, title, text, variant, children }) {
  return (
    <div className={variant ? `card empty-state empty-state--${variant}` : "card empty-state"}>
      <span className="empty-state__icon">{icon}</span>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
      {children && <div className="empty-state__actions">{children}</div>}
    </div>
  );
}

export default EmptyState;
