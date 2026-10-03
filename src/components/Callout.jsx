function Callout({ type, title, children }) {
  return (
    <div className={`callout callout--${type}`}>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

export default Callout;
