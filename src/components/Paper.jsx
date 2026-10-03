import { Fragment } from "react";

function Paper({ lines, size, className = "", style }) {
  const classes = ["paper", size && `paper--${size}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} style={style}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </div>
  );
}

export default Paper;
