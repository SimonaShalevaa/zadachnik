import { useEffect } from "react";
import Paper from "./Paper";

function Lightbox({ title, lines, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__bar">
        <span className="lightbox__title">{title}</span>
        <div className="lightbox__tools">
          <button onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <Paper lines={lines} className="paper--lg lightbox__img" />
      </div>
      <p className="lightbox__hint">Натисни Esc или кликни извън снимката, за да затвориш</p>
    </div>
  );
}

export default Lightbox;
