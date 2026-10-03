import { useEffect, useRef, useState } from "react";
import { NOTIFICATIONS } from "../data/notifications";

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, unread: false })));
  const openItem = (id) => {
    setItems((list) => list.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onHashChange = () => setOpen(false);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [open]);

  return (
    <div className="notif" ref={ref}>
      <button
        className={open ? "notif__bell notif__bell--active" : "notif__bell"}
        aria-label={`Известия (${unreadCount} непрочетени)`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <BellIcon />
        {unreadCount > 0 && <span className="notif__count">{unreadCount}</span>}
      </button>
      {open && (
        <div className="card notif__panel" role="menu">
          <div className="notif__head">
            <strong>Известия</strong>
            {unreadCount > 0 && (
              <button className="link-btn" onClick={markAllRead}>
                Маркирай всички като прочетени
              </button>
            )}
          </div>
          <ul className="notif__list">
            {items.map((n) => (
              <li key={n.id}>
                <a
                  href={n.href}
                  className={n.unread ? "notif__item notif__item--unread" : "notif__item"}
                  onClick={() => openItem(n.id)}
                >
                  <span className={`notif__icon notif__icon--${n.kind}`}>{n.icon}</span>
                  <span className="notif__text">
                    {n.who && <strong>{n.who} </strong>}
                    {n.text}
                    <small>{n.time}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#profile" className="notif__all" onClick={() => setOpen(false)}>
            Виж всички известия
          </a>
        </div>
      )}
    </div>
  );
}

export default Notifications;
