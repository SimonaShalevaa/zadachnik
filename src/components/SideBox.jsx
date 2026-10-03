function SideBox({ title, className = "", children }) {
  return (
    <div className={`card side-box ${className}`.trim()}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export default SideBox;
