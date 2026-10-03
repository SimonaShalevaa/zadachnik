import { useEffect, useState } from "react";
import Paper from "./Paper";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const STEP = 0.25;

function Lightbox({ title, lines, onClose }) {
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + STEP));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - STEP));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const stop = (e) => e.stopPropagation();

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Снимка на условието" onClick={onClose}>
      <div className="lightbox__bar" onClick={stop}>
        <span className="lightbox__title">{title}</span>
        <div className="lightbox__tools">
          <button onClick={zoomOut} aria-label="Намали">
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} aria-label="Увеличи">
            +
          </button>
          <button onClick={onClose} aria-label="Затвори">
            ✕
          </button>
        </div>
      </div>
      <div className="lightbox__stage" onClick={stop}>
        <Paper lines={lines} size="lg" className="lightbox__img" style={{ transform: `scale(${zoom})` }} />
      </div>
      <p className="lightbox__hint">Esc или клик извън снимката за затваряне · +/− за мащаб</p>
    </div>
  );
}

export default Lightbox;
