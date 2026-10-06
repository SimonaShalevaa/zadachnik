function Paper({ lines, className }) {
  return (
    <div className={"paper " + (className || "")}>
      {lines.map((line, index) => (
        <p key={index} className="paper__line">
          {line}
        </p>
      ))}
    </div>
  );
}

export default Paper;
