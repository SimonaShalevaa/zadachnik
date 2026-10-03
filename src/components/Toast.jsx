function Toast({ type = "success", children }) {
  return <div className={`toast toast--${type}`}>{children}</div>;
}

export default Toast;
