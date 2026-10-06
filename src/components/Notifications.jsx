import { useEffect, useRef, useState } from "react";
import { notifications as initialNotifications } from "../data/notifications";

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function markAllAsRead() {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  }

  function openNotification(id) {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    setIsOpen(false);
  }

  return (
    <div className="notif" ref={boxRef}>
      <button className="notif__bell" onClick={() => setIsOpen(!isOpen)}>
        🔔
        {unreadCount > 0 && <span className="notif__count">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="card notif__panel">
          <div className="notif__head">
            <strong>Известия</strong>
            {unreadCount > 0 && (
              <button className="link-btn" onClick={markAllAsRead}>
                Маркирай всички като прочетени
              </button>
            )}
          </div>
          <ul className="notif__list">
            {notifications.map((n) => (
              <li key={n.id}>
                <a
                  href={n.href}
                  className={n.unread ? "notif__item notif__item--unread" : "notif__item"}
                  onClick={() => openNotification(n.id)}
                >
                  <span className={"notif__icon notif__icon--" + n.kind}>{n.icon}</span>
                  <span className="notif__text">
                    {n.who && <strong>{n.who} </strong>}
                    {n.text}
                    <small>{n.time}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
