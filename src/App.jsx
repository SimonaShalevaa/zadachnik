import { useEffect, useRef, useState } from "react";

const scrollToSection = (e) => {
  e.preventDefault();
  const id = e.currentTarget.getAttribute("href").slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: "✓",
    kind: "solved",
    who: "Елена К.",
    text: "реши твоята задача „Основно тригонометрично тъждество“",
    time: "преди 5 мин",
    href: "#task",
    unread: true,
  },
  {
    id: 2,
    icon: "★",
    kind: "best",
    who: "",
    text: "Решението ти беше избрано за най-добро · +25 т.",
    time: "преди 1 ч",
    href: "#task",
    unread: true,
  },
  {
    id: 3,
    icon: "💬",
    kind: "comment",
    who: "Димитър С.",
    text: "коментира решението ти: „Супер обяснено, благодаря!“",
    time: "преди 3 ч",
    href: "#task",
    unread: true,
  },
  {
    id: 4,
    icon: "🔥",
    kind: "badge",
    who: "",
    text: "Получи значка „7 дни поред“",
    time: "вчера",
    href: "#profile",
    unread: false,
  },
  {
    id: 5,
    icon: "📰",
    kind: "blog",
    who: "",
    text: "Нова статия: „10 грешки, които струват точки на НВО“",
    time: "преди 2 дни",
    href: "#article",
    unread: false,
  },
];

function App() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((list) => list.map((n) => ({ ...n, unread: false })));
  const openNotification = (id) => {
    setNotifications((list) =>
      list.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setNotifOpen(false);
  };

  useEffect(() => {
    if (!notifOpen) return;
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [notifOpen]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const openLightbox = () => {
    setZoom(1);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegisterPw, setShowRegisterPw] = useState(false);
  const [role, setRole] = useState("student");

  useEffect(() => {
    const onHashChange = () => {
      setNotifOpen(false);
      setLightboxOpen(false);
      const toggle = document.getElementById("nav-toggle");
      if (toggle) toggle.checked = false;

      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && !document.getElementById(id)) {
        window.location.replace("#not-found");
      }
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="container header__inner">
          <a href="#home" className="logo">
            <span className="logo__mark">∑</span>
            <span className="logo__text">Задачник</span>
          </a>
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <label htmlFor="nav-toggle" className="nav-burger" aria-label="Меню">
            <span />
          </label>
          <nav className="nav">
            {" "}
            <a href="#home" className="nav__link">
              Задачи
            </a>
            <a href="#leaderboard" className="nav__link">
              Класация
            </a>
            <a href="#blog" className="nav__link">
              Блог
            </a>
            <a href="#profile" className="nav__link">
              Моят профил
            </a>
            <div className="nav__search">
              <input type="search" placeholder="Търси задача…" />
            </div>
            <a href="#upload" className="btn btn--primary">
              + Качи задача
            </a>
          </nav>
          <div className="notif" ref={notifRef}>
            <button
              className={`notif__bell ${notifOpen ? "notif__bell--active" : ""}`}
              aria-label={`Известия (${unreadCount} непрочетени)`}
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen((open) => !open)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {unreadCount > 0 && <span className="notif__count">{unreadCount}</span>}
            </button>
            {notifOpen && (
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
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <a
                        href={n.href}
                        className={`notif__item ${n.unread ? "notif__item--unread" : ""}`}
                        onClick={() => openNotification(n.id)}
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
                <a href="#profile" className="notif__all" onClick={() => setNotifOpen(false)}>
                  Виж всички известия
                </a>
              </div>
            )}
          </div>
          <a href="#profile" className="avatar header__avatar" title="Мария П.">
            МП
          </a>
        </div>
      </header>
      <main className="container main">
        <section id="home" className="view">
          <div className="hero">
            <div>
              <h1>Заседна на задача?</h1>
              <p>
                Снимай условието, качи го и някой от съучениците ти ще помогне.
                Или реши чужда задача и събери точки.
              </p>
              <a href="#how" className="hero__link">
                Как работи? →
              </a>
            </div>
            <div className="hero__stats">
              <div className="stat">
                <strong>1 248</strong>
                <span>задачи</span>
              </div>
              <div className="stat">
                <strong>3 910</strong>
                <span>решения</span>
              </div>
              <div className="stat">
                <strong>86%</strong>
                <span>решени</span>
              </div>
            </div>
          </div>
          <div className="filters">
            <div className="chips">
              <button className="chip chip--active">Всички</button>
              <button className="chip">Математика</button>
              <button className="chip">Физика</button>
              <button className="chip">Химия</button>
              <button className="chip">Информатика</button>
              <button className="chip">Биология</button>
            </div>
            <div className="filters__selects">
              <select>
                <option>Всички класове</option>
                <option>5 клас</option>
                <option>6 клас</option>
                <option>7 клас</option>
                <option>8 клас</option>
                <option>9 клас</option>
                <option>10 клас</option>
                <option>11 клас</option>
                <option>12 клас</option>
              </select>
              <select>
                <option>Най-нови</option>
                <option>Без решение</option>
                <option>Най-популярни</option>
              </select>
            </div>
          </div>
          <div className="grid">
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  x² − 5x + 6 = 0<br />
                  Намерете корените.
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--math">Математика</span>
                  <span className="tag">8 клас</span>
                </div>
                <h3>
                  <a href="#task">Квадратно уравнение с цели корени</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--open">Без решение</span>
                  <span>💬 0</span>
                  <span>преди 5 мин</span>
                </div>
              </div>
            </article>
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  v₀ = 20 m/s, α = 30°
                  <br />
                  Колко далеч пада?
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--phys">Физика</span>
                  <span className="tag">9 клас</span>
                </div>
                <h3>
                  <a href="#task">Хвърляне под ъгъл спрямо хоризонта</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--solved">Решена</span>
                  <span>💬 3</span>
                  <span>преди 1 ч</span>
                </div>
              </div>
            </article>
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  CH₄ + O₂ → ?<br />
                  Изравнете.
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--chem">Химия</span>
                  <span className="tag">8 клас</span>
                </div>
                <h3>
                  <a href="#task">Изгаряне на метан</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--progress">1 решение</span>
                  <span>💬 1</span>
                  <span>преди 3 ч</span>
                </div>
              </div>
            </article>
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  △ABC: AB = 6, BC = 8,
                  <br />
                  ∠B = 90°. AC = ?
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--math">Математика</span>
                  <span className="tag">7 клас</span>
                </div>
                <h3>
                  <a href="#task">Питагорова теорема</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--solved">Решена</span>
                  <span>💬 5</span>
                  <span>вчера</span>
                </div>
              </div>
            </article>
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  for i in range(10):
                  <br />
                  &nbsp;&nbsp;print(?)
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--it">Информатика</span>
                  <span className="tag">10 клас</span>
                </div>
                <h3>
                  <a href="#task">Цикъл за четни числа</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--open">Без решение</span>
                  <span>💬 0</span>
                  <span>вчера</span>
                </div>
              </div>
            </article>
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  log₂(x + 1) = 3<br />x = ?
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--math">Математика</span>
                  <span className="tag">11 клас</span>
                </div>
                <h3>
                  <a href="#task">Логаритмично уравнение</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--progress">2 решения</span>
                  <span>💬 2</span>
                  <span>преди 2 дни</span>
                </div>
              </div>
            </article>
          </div>
          <div className="pagination">
            <button className="btn btn--ghost">Зареди още</button>
          </div>
          <div className="section-head">
            <h2>От блога</h2>
            <a href="#blog" className="section-head__link">
              Всички статии →
            </a>
          </div>
          <div className="blog-grid">
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--math">
                <span>x²</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Математика</span>
                <h3>
                  <a href="#article">Квадратни уравнения за 3 минути: пълно ръководство</a>
                </h3>
                <p>Дискриминанта, формули на Виет и кога изобщо не ти трябват.</p>
                <div className="blog-card__meta">
                  <span>Елена К.</span>
                  <span>· 6 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--exam">
                <span>✎</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Изпити</span>
                <h3>
                  <a href="#article">10 грешки, които струват точки на НВО</a>
                </h3>
                <p>Най-честите пропуски от миналогодишните изпити и как да ги избегнеш.</p>
                <div className="blog-card__meta">
                  <span>Георги Т.</span>
                  <span>· 8 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--tips">
                <span>💡</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Съвети за учене</span>
                <h3>
                  <a href="#article">Как да снимаш задача, за да получиш решение по-бързо</a>
                </h3>
                <p>Светлина, ъгъл и какво да напишеш в описанието.</p>
                <div className="blog-card__meta">
                  <span>Екипът на Задачник</span>
                  <span>· 3 мин четене</span>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section id="task" className="view">
          <a href="#home" className="back">
            ← Към всички задачи
          </a>
          <div className="task-layout">
            <div>
              <article className="card task-detail">
                <div className="task-detail__head">
                  <div className="author">
                    <span className="avatar avatar--sm">ИГ</span>
                    <div>
                      <strong>Иван Г.</strong>
                      <small>8 клас · преди 5 мин</small>
                    </div>
                  </div>
                  <span className="status status--progress">2 решения</span>
                </div>
                <h1>Квадратно уравнение с цели корени</h1>
                <div className="tags">
                  <span className="tag tag--math">Математика</span>
                  <span className="tag">8 клас</span>
                  <span className="tag">Уравнения</span>
                </div>
                <div
                  className="task-detail__img"
                  role="button"
                  tabIndex={0}
                  aria-label="Отвори снимката на цял екран"
                  onClick={openLightbox}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openLightbox()}
                >
                  <span className="task-detail__zoom">🔍 Увеличи</span>
                  <div className="paper paper--lg">
                    Задача 4.
                    <br />
                    x² − 5x + 6 = 0<br />
                    Намерете корените и проверете.
                  </div>
                </div>
                <p className="task-detail__note">
                  Не разбирам как се ползва формулата с дискриминантата, може ли
                  някой да обясни стъпка по стъпка?
                </p>
                <div className="task-detail__actions">
                  <button className="btn btn--ghost">🔖 Запази</button>
                  <button className="btn btn--ghost">↗ Сподели</button>
                  <button className="btn btn--ghost btn--danger">
                    ⚑ Докладвай
                  </button>
                </div>
              </article>
              <h2 className="section-title">
                Решения <span>(2)</span>
              </h2>
              <article className="card solution solution--best">
                <div className="solution__votes">
                  <button className="vote">▲</button>
                  <strong>14</strong>
                  <button className="vote">▼</button>
                </div>
                <div className="solution__body">
                  <div className="solution__head">
                    <div className="author">
                      <span className="avatar avatar--sm avatar--alt">ЕК</span>
                      <div>
                        <strong>Елена К.</strong>
                        <small>⭐ 1 240 т. · преди 2 мин</small>
                      </div>
                    </div>
                    <span className="badge-best">✓ Най-добро решение</span>
                  </div>
                  <details className="spoiler">
                    <summary>💡 Подсказка (опитай първо сам)</summary>
                    <p>
                      Потърси две числа, чийто сбор е 5, а произведението — 6.
                    </p>
                  </details>
                  <details className="spoiler" open="">
                    <summary>📝 Пълно решение</summary>
                    <p>
                      D = b² − 4ac = 25 − 24 = 1<br />
                      x₁,₂ = (5 ± 1) / 2 ⇒ <strong>x₁ = 3, x₂ = 2</strong>
                    </p>
                    <div className="paper paper--sm">
                      D = 1 → x₁ = 3, x₂ = 2 ✓
                    </div>
                  </details>
                  <div className="solution__footer">
                    <button className="link-btn">💬 Коментари (2)</button>
                    <button className="link-btn">🙏 Благодаря</button>
                  </div>
                </div>
              </article>
              <article className="card solution">
                <div className="solution__votes">
                  <button className="vote">▲</button>
                  <strong>3</strong>
                  <button className="vote">▼</button>
                </div>
                <div className="solution__body">
                  <div className="solution__head">
                    <div className="author">
                      <span className="avatar avatar--sm">ДС</span>
                      <div>
                        <strong>Димитър С.</strong>
                        <small>⭐ 320 т. · преди 1 мин</small>
                      </div>
                    </div>
                  </div>
                  <details className="spoiler">
                    <summary>📝 Пълно решение</summary>
                    <p>Разлагаме: (x − 2)(x − 3) = 0, значи x = 2 или x = 3.</p>
                  </details>
                  <div className="solution__footer">
                    <button className="link-btn">💬 Коментари (0)</button>
                    <button className="link-btn">
                      ✓ Маркирай като най-добро
                    </button>
                  </div>
                </div>
              </article>
              <article className="card form-card">
                <h2>Добави решение</h2>
                <textarea
                  rows={4}
                  placeholder="Опиши решението си… (поддържа формули, напр. $x^2$)"
                  defaultValue={""}
                />
                <label className="dropzone dropzone--sm">
                  <input type="file" accept="image/*" multiple="" hidden="" />
                  <span>📷 Прикачи снимка на решението</span>
                </label>
                <label className="checkbox">
                  <input type="checkbox" /> Скрий като спойлер
                </label>
                <div className="form-actions">
                  <button className="btn btn--primary">
                    Публикувай решение
                  </button>
                </div>
              </article>
            </div>
            <aside className="sidebar">
              <div className="card side-box">
                <h3>Подобни задачи</h3>
                <ul className="side-list">
                  <li>
                    <a href="#task">x² + 2x − 8 = 0</a>
                    <span className="tag">8 кл.</span>
                  </li>
                  <li>
                    <a href="#task">Формули на Виет</a>
                    <span className="tag">8 кл.</span>
                  </li>
                  <li>
                    <a href="#task">Биквадратни уравнения</a>
                    <span className="tag">9 кл.</span>
                  </li>
                </ul>
              </div>
              <div className="card side-box">
                <h3>Правила</h3>
                <ul className="rules">
                  <li>Обяснявай, не само давай отговор.</li>
                  <li>Бъди учтив в коментарите.</li>
                  <li>Не качвай задачи от текущи контролни.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
        <section id="upload" className="view">
          <div className="narrow">
            <h1>Качи нова задача</h1>
            <p className="muted">Снимай условието ясно и на добра светлина.</p>
            <form className="card form-card">
              <label className="dropzone">
                <input type="file" accept="image/*" hidden="" />
                <span className="dropzone__icon">📷</span>
                <strong>Пусни снимка тук или кликни</strong>
                <small>JPG, PNG до 10 MB</small>
              </label>
              <div className="field">
                <label>Заглавие</label>
                <input
                  type="text"
                  placeholder="напр. Квадратно уравнение с параметър"
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Предмет</label>
                  <select>
                    <option>Математика</option>
                    <option>Физика</option>
                    <option>Химия</option>
                    <option>Информатика</option>
                    <option>Биология</option>
                  </select>
                </div>
                <div className="field">
                  <label>Клас</label>
                  <select defaultValue="8">
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>
                  Какво точно не ти е ясно? <small>(по желание)</small>
                </label>
                <textarea
                  rows={3}
                  placeholder="Помага на останалите да ти обяснят по-добре"
                  defaultValue={""}
                />
              </div>
              <div className="field">
                <label>Етикети</label>
                <input type="text" placeholder="уравнения, дискриминанта" />
              </div>
              <div className="form-actions">
                <a href="#home" className="btn btn--ghost">
                  Отказ
                </a>
                <button type="button" className="btn btn--primary">
                  Публикувай
                </button>
              </div>
            </form>
          </div>
        </section>
        <section id="leaderboard" className="view">
          <div className="narrow">
            <h1>Класация</h1>
            <div className="chips">
              <button className="chip chip--active">Тази седмица</button>
              <button className="chip">Този месец</button>
              <button className="chip">Всички времена</button>
            </div>
            <ol className="card leaderboard">
              <li>
                <span className="rank rank--1">1</span>
                <span className="avatar avatar--sm avatar--alt">ЕК</span>
                <strong>Елена К.</strong>
                <small>11 клас</small>
                <span className="points">1 240 т.</span>
              </li>
              <li>
                <span className="rank rank--2">2</span>
                <span className="avatar avatar--sm">МП</span>
                <strong>Мария П.</strong>
                <small>10 клас</small>
                <span className="points">980 т.</span>
              </li>
              <li>
                <span className="rank rank--3">3</span>
                <span className="avatar avatar--sm">ГТ</span>
                <strong>Георги Т.</strong>
                <small>12 клас</small>
                <span className="points">870 т.</span>
              </li>
              <li>
                <span className="rank">4</span>
                <span className="avatar avatar--sm">ДС</span>
                <strong>Димитър С.</strong>
                <small>9 клас</small>
                <span className="points">320 т.</span>
              </li>
              <li>
                <span className="rank">5</span>
                <span className="avatar avatar--sm">ИГ</span>
                <strong>Иван Г.</strong>
                <small>8 клас</small>
                <span className="points">140 т.</span>
              </li>
            </ol>
          </div>
        </section>
        <section id="profile" className="view">
          <div className="card profile">
            <span className="avatar avatar--lg">МП</span>
            <div className="profile__info">
              <h1>Мария Петрова</h1>
              <p className="muted">10 клас · СМГ „Паисий Хилендарски“</p>
              <div className="badges">
                <span className="badge">🏅 Математик</span>
                <span className="badge">🔥 7 дни поред</span>
                <span className="badge">🤝 50 решения</span>
              </div>
            </div>
            <div className="hero__stats">
              <div className="stat">
                <strong>980</strong>
                <span>точки</span>
              </div>
              <div className="stat">
                <strong>52</strong>
                <span>решения</span>
              </div>
              <div className="stat">
                <strong>12</strong>
                <span>задачи</span>
              </div>
            </div>
          </div>
          <div className="tabs">
            <a className="tab tab--active">Моите задачи</a>
            <a className="tab">Моите решения</a>
            <a className="tab">Запазени</a>
          </div>
          <div className="grid">
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">sin²x + cos²x = ?</div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--math">Математика</span>
                  <span className="tag">10 клас</span>
                </div>
                <h3>
                  <a href="#task">Основно тригонометрично тъждество</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--solved">Решена</span>
                  <span>💬 4</span>
                </div>
              </div>
            </article>
            <article className="card task-card">
              <a href="#task" className="task-card__img">
                <div className="paper">
                  F = m·a, m = 2 kg
                  <br />a = ?
                </div>
              </a>
              <div className="task-card__body">
                <div className="tags">
                  <span className="tag tag--phys">Физика</span>
                  <span className="tag">10 клас</span>
                </div>
                <h3>
                  <a href="#task">Втори закон на Нютон</a>
                </h3>
                <div className="task-card__meta">
                  <span className="status status--open">Без решение</span>
                  <span>💬 0</span>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section id="blog" className="view">
          <div className="blog-head">
            <h1>Блог</h1>
            <p className="muted">
              Обяснения, трикове и съвети за учене – написани от ученици и учители.
            </p>
          </div>
          <article className="card blog-featured">
            <a href="#article" className="blog-featured__cover blog-card__cover--math">
              <span>∑</span>
            </a>
            <div className="blog-featured__body">
              <span className="badge-featured">★ Избрана статия</span>
              <span className="blog-card__cat">Математика</span>
              <h2>
                <a href="#article">Квадратни уравнения за 3 минути: пълно ръководство</a>
              </h2>
              <p className="muted">
                Всичко, което трябва да знаеш за квадратните уравнения – от
                дискриминантата до формулите на Виет, с решени примери и чести
                грешки.
              </p>
              <div className="author">
                <span className="avatar avatar--sm avatar--alt">ЕК</span>
                <div>
                  <strong>Елена К.</strong>
                  <small>12 септ. 2026 · 6 мин четене</small>
                </div>
              </div>
            </div>
          </article>
          <div className="chips blog-chips">
            <button className="chip chip--active">Всички</button>
            <button className="chip">Математика</button>
            <button className="chip">Физика</button>
            <button className="chip">Химия</button>
            <button className="chip">Изпити</button>
            <button className="chip">Съвети за учене</button>
            <button className="chip">Общност</button>
          </div>
          <div className="blog-grid">
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--exam">
                <span>✎</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Изпити</span>
                <h3>
                  <a href="#article">10 грешки, които струват точки на НВО</a>
                </h3>
                <p>Най-честите пропуски от миналогодишните изпити и как да ги избегнеш.</p>
                <div className="blog-card__meta">
                  <span>Георги Т.</span>
                  <span>· 8 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--phys">
                <span>⚛</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Физика</span>
                <h3>
                  <a href="#article">Законите на Нютон с примери от ежедневието</a>
                </h3>
                <p>Защо колата те „дърпа“ назад при потегляне и какво общо има това с F = m·a.</p>
                <div className="blog-card__meta">
                  <span>Мария П.</span>
                  <span>· 5 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--tips">
                <span>💡</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Съвети за учене</span>
                <h3>
                  <a href="#article">Как да снимаш задача, за да получиш решение по-бързо</a>
                </h3>
                <p>Светлина, ъгъл и какво да напишеш в описанието.</p>
                <div className="blog-card__meta">
                  <span>Екипът на Задачник</span>
                  <span>· 3 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--chem">
                <span>⚗</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Химия</span>
                <h3>
                  <a href="#article">Изравняване на химични уравнения стъпка по стъпка</a>
                </h3>
                <p>Методът, с който никога повече няма да се чудиш откъде да започнеш.</p>
                <div className="blog-card__meta">
                  <span>Димитър С.</span>
                  <span>· 7 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--it">
                <span>{"</>"}</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Информатика</span>
                <h3>
                  <a href="#article">Първите ти 5 задачи на Python</a>
                </h3>
                <p>Цикли, условия и списъци – обяснени така, че да останат.</p>
                <div className="blog-card__meta">
                  <span>Иван Г.</span>
                  <span>· 6 мин четене</span>
                </div>
              </div>
            </article>
            <article className="card blog-card">
              <a href="#article" className="blog-card__cover blog-card__cover--community">
                <span>🤝</span>
              </a>
              <div className="blog-card__body">
                <span className="blog-card__cat">Общност</span>
                <h3>
                  <a href="#article">Как да пишеш решения, които наистина помагат</a>
                </h3>
                <p>Обяснявай, не само давай отговор – и събирай повече точки.</p>
                <div className="blog-card__meta">
                  <span>Екипът на Задачник</span>
                  <span>· 4 мин четене</span>
                </div>
              </div>
            </article>
          </div>
          <div className="pagination">
            <button className="btn btn--ghost">Още статии</button>
          </div>
          <div className="card newsletter">
            <div>
              <h3>📬 Нови статии всяка седмица</h3>
              <p className="muted">Кратко, полезно и без спам. Отписваш се с един клик.</p>
            </div>
            <form className="newsletter__form">
              <input type="email" placeholder="твоят имейл" />
              <button type="button" className="btn btn--primary">
                Абонирай се
              </button>
            </form>
          </div>
        </section>
        <section id="article" className="view">
          <a href="#blog" className="back">
            ← Към блога
          </a>
          <div className="article-layout">
            <article className="card article">
              <div className="article__cover blog-card__cover--math">
                <span>x²</span>
              </div>
              <div className="article__content">
                <span className="blog-card__cat">Математика · 8 клас</span>
                <h1>Квадратни уравнения за 3 минути: пълно ръководство</h1>
                <div className="article__meta">
                  <div className="author">
                    <span className="avatar avatar--sm avatar--alt">ЕК</span>
                    <div>
                      <strong>Елена К.</strong>
                      <small>12 септ. 2026 · 6 мин четене</small>
                    </div>
                  </div>
                  <div className="article__share">
                    <button className="btn btn--ghost">🔖 Запази</button>
                    <button className="btn btn--ghost">↗ Сподели</button>
                  </div>
                </div>
                <p className="article__lead">
                  Квадратното уравнение изглежда страшно само докато не видиш,
                  че винаги се решава по един и същи начин. Ето го.
                </p>
                <h2 id="sec-what">Какво е квадратно уравнение</h2>
                <p>
                  Уравнение от вида <code>ax² + bx + c = 0</code>, където
                  a ≠ 0. Числата a, b и c се наричат коефициенти.
                </p>
                <h2 id="sec-discriminant">Дискриминанта</h2>
                <p>Първо пресмятаме дискриминантата – тя казва колко корена има уравнението:</p>
                <div className="paper paper--sm article__formula">D = b² − 4ac</div>
                <ul>
                  <li><strong>D &gt; 0</strong> – два различни корена</li>
                  <li><strong>D = 0</strong> – един (двоен) корен</li>
                  <li><strong>D &lt; 0</strong> – няма реални корени</li>
                </ul>
                <div className="callout callout--tip">
                  <strong>💡 Трик</strong>
                  <p>
                    Ако a = 1, потърси две числа със сбор −b и произведение c.
                    За x² − 5x + 6 = 0 това са 2 и 3.
                  </p>
                </div>
                <h2 id="sec-example">Решен пример</h2>
                <p>Да решим x² − 5x + 6 = 0:</p>
                <div className="paper paper--sm article__formula">
                  D = 25 − 24 = 1 → x₁ = 3, x₂ = 2
                </div>
                <div className="callout callout--warn">
                  <strong>⚠ Честа грешка</strong>
                  <p>Забравен знак минус пред b във формулата за корените.</p>
                </div>
                <h2 id="sec-practice">Упражни се</h2>
                <p>Опитай тези задачи от Задачник и провери решенията на другите:</p>
                <ul className="side-list article__practice">
                  <li>
                    <a href="#task">x² + 2x − 8 = 0</a>
                    <span className="tag">8 кл.</span>
                  </li>
                  <li>
                    <a href="#task">Формули на Виет</a>
                    <span className="tag">8 кл.</span>
                  </li>
                </ul>
                <div className="article__tags tags">
                  <span className="tag">уравнения</span>
                  <span className="tag">дискриминанта</span>
                  <span className="tag">НВО</span>
                </div>
                <div className="article__footer">
                  <button className="btn btn--ghost">👍 Полезна (48)</button>
                  <button className="link-btn">💬 Коментари (6)</button>
                </div>
              </div>
            </article>
            <aside className="sidebar">
              <div className="card side-box">
                <h3>Съдържание</h3>
                <ol className="toc">
                  <li><a href="#sec-what" onClick={scrollToSection}>Какво е квадратно уравнение</a></li>
                  <li><a href="#sec-discriminant" onClick={scrollToSection}>Дискриминанта</a></li>
                  <li><a href="#sec-example" onClick={scrollToSection}>Решен пример</a></li>
                  <li><a href="#sec-practice" onClick={scrollToSection}>Упражни се</a></li>
                </ol>
              </div>
              <div className="card side-box author-box">
                <span className="avatar avatar--lg avatar--alt">ЕК</span>
                <strong>Елена К.</strong>
                <small className="muted">11 клас · ⭐ 1 240 т.</small>
                <p className="muted">Обича алгебрата и да обяснява с примери.</p>
              </div>
              <div className="card side-box">
                <h3>Още статии</h3>
                <ul className="side-list">
                  <li><a href="#article">10 грешки на НВО</a></li>
                  <li><a href="#article">Законите на Нютон</a></li>
                  <li><a href="#article">Първите ти 5 задачи на Python</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
        <section id="how" className="view">
          <div className="page-head page-head--center">
            <span className="eyebrow">Как работи</span>
            <h1>Ученици помагат на ученици</h1>
            <p className="muted">
              Задачник е място, където можеш да получиш помощ за домашното и да
              помогнеш на другите – безплатно и без реклами.
            </p>
          </div>
          <ol className="steps">
            <li className="card step">
              <span className="step__num">1</span>
              <span className="step__icon">📷</span>
              <h3>Снимай и качи</h3>
              <p className="muted">
                Снимай условието ясно, избери предмет и клас и напиши какво
                точно не ти е ясно.
              </p>
            </li>
            <li className="card step">
              <span className="step__num">2</span>
              <span className="step__icon">🤝</span>
              <h3>Получи обяснение</h3>
              <p className="muted">
                Съученици публикуват решения с обяснение. Гласувай за най-
                полезното и го маркирай като най-добро.
              </p>
            </li>
            <li className="card step">
              <span className="step__num">3</span>
              <span className="step__icon">⭐</span>
              <h3>Помагай и печели</h3>
              <p className="muted">
                Решавай чужди задачи, събирай точки и значки и се изкачи в
                класацията на седмицата.
              </p>
            </li>
          </ol>
          <div className="how-grid">
            <div className="card side-box">
              <h2>Точкова система</h2>
              <table className="points-table">
                <tbody>
                  <tr><td>Публикувано решение</td><td className="plus">+10</td></tr>
                  <tr><td>Решение с 5+ положителни гласа</td><td className="plus">+15</td></tr>
                  <tr><td>Избрано за най-добро решение</td><td className="plus">+25</td></tr>
                  <tr><td>Твоята задача получи решение</td><td className="plus">+2</td></tr>
                  <tr><td>Всеки ден поред в сайта</td><td className="plus">+5</td></tr>
                  <tr><td>Премахнато решение (нарушение)</td><td className="minus">−20</td></tr>
                </tbody>
              </table>
              <h3 className="how-sub">Значки</h3>
              <div className="badges">
                <span className="badge">🏅 Математик</span>
                <span className="badge">🔬 Физик</span>
                <span className="badge">🔥 7 дни поред</span>
                <span className="badge">🤝 50 решения</span>
                <span className="badge">🎓 Наставник</span>
              </div>
            </div>
            <div className="card side-box">
              <h2>Правила</h2>
              <ul className="rules">
                <li>Обяснявай стъпките, не давай само отговор.</li>
                <li>Бъди учтив – зад всеки профил стои ученик.</li>
                <li>Не качвай задачи от текущи контролни и изпити.</li>
                <li>Една задача – една публикация. Без дубликати.</li>
                <li>Без лични данни в снимките (имена, телефони, адреси).</li>
                <li>Докладвай грешни или обидни решения с ⚑.</li>
              </ul>
            </div>
          </div>
          <h2 className="section-title faq-title">Често задавани въпроси</h2>
          <div className="faq">
            <details className="spoiler">
              <summary>Безплатно ли е?</summary>
              <p>Да. Задачник е изцяло безплатен и без реклами.</p>
            </details>
            <details className="spoiler">
              <summary>Какво става, ако решението е грешно?</summary>
              <p>
                Гласувай с ▼ и напиши коментар. Решения с много отрицателни гласове
                се скриват, а модераторите преглеждат докладваните.
              </p>
            </details>
            <details className="spoiler">
              <summary>Кой вижда моя профил?</summary>
              <p>
                Другите виждат само името, класа, точките и значките ти. Имейлът и
                училището ти не са публични.
              </p>
            </details>
            <details className="spoiler">
              <summary>Могат ли учители да се включат?</summary>
              <p>
                Да – при регистрация избери „Учител“. Учителските решения имат
                специален знак.
              </p>
            </details>
            <details className="spoiler">
              <summary>На колко години трябва да съм?</summary>
              <p>
                Сайтът е за ученици от 5 до 12 клас. Ако си под 14 години, ще ти
                трябва съгласие от родител при регистрация.
              </p>
            </details>
          </div>
          <div className="card cta">
            <div>
              <h2>Готов ли си да започнеш?</h2>
              <p className="muted">Регистрацията отнема по-малко от минута.</p>
            </div>
            <div className="cta__actions">
              <a href="#register" className="btn btn--primary">
                Създай профил
              </a>
              <a href="#home" className="btn btn--ghost">
                Разгледай задачите
              </a>
            </div>
          </div>
        </section>
        <section id="login" className="view">
          <div className="card auth">
            <div className="auth__aside">
              <span className="logo__mark">∑</span>
              <h2>Добре дошъл отново!</h2>
              <ul className="auth__perks">
                <li>📷 Качвай задачи и получавай решения</li>
                <li>⭐ Събирай точки и значки</li>
                <li>🔖 Запазвай полезни решения</li>
              </ul>
            </div>
            <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
              <div className="auth__tabs">
                <a href="#login" className="auth__tab auth__tab--active">Вход</a>
                <a href="#register" className="auth__tab">Регистрация</a>
              </div>
              <button type="button" className="btn btn--ghost btn--block">
                <span className="g-mark">G</span> Продължи с Google
              </button>
              <div className="divider"><span>или с имейл</span></div>
              <div className="field">
                <label htmlFor="login-email">Имейл</label>
                <input id="login-email" type="email" placeholder="ime@primer.bg" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="login-pw">Парола</label>
                <div className="pw-field">
                  <input
                    id="login-pw"
                    type={showLoginPw ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowLoginPw((s) => !s)}>
                    {showLoginPw ? "Скрий" : "Покажи"}
                  </button>
                </div>
              </div>
              <div className="auth__row">
                <label className="checkbox">
                  <input type="checkbox" defaultChecked /> Запомни ме
                </label>
                <a href="#login" className="auth__link">Забравена парола?</a>
              </div>
              <button type="submit" className="btn btn--primary btn--block">
                Влез
              </button>
              <p className="auth__alt muted">
                Нямаш профил? <a href="#register" className="auth__link">Регистрирай се</a>
              </p>
            </form>
          </div>
        </section>
        <section id="register" className="view">
          <div className="card auth">
            <div className="auth__aside">
              <span className="logo__mark">∑</span>
              <h2>Присъедини се към Задачник</h2>
              <ul className="auth__perks">
                <li>🤝 Над 3 900 решения от съученици</li>
                <li>🏆 Седмична класация и значки</li>
                <li>🆓 Безплатно и без реклами</li>
              </ul>
            </div>
            <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
              <div className="auth__tabs">
                <a href="#login" className="auth__tab">Вход</a>
                <a href="#register" className="auth__tab auth__tab--active">Регистрация</a>
              </div>
              <div className="role-switch" role="radiogroup" aria-label="Роля">
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === "student"}
                  className={`role-switch__opt ${role === "student" ? "role-switch__opt--active" : ""}`}
                  onClick={() => setRole("student")}
                >
                  🎒 Ученик
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === "teacher"}
                  className={`role-switch__opt ${role === "teacher" ? "role-switch__opt--active" : ""}`}
                  onClick={() => setRole("teacher")}
                >
                  🍎 Учител
                </button>
              </div>
              <div className="field">
                <label htmlFor="reg-name">Име и фамилия</label>
                <input id="reg-name" type="text" placeholder="напр. Мария Петрова" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="reg-email">Имейл</label>
                <input id="reg-email" type="email" placeholder="ime@primer.bg" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="reg-pw">Парола</label>
                <div className="pw-field">
                  <input
                    id="reg-pw"
                    type={showRegisterPw ? "text" : "password"}
                    placeholder="поне 8 символа"
                    autoComplete="new-password"
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowRegisterPw((s) => !s)}>
                    {showRegisterPw ? "Скрий" : "Покажи"}
                  </button>
                </div>
                <div className="pw-strength" aria-hidden="true">
                  <span className="on" />
                  <span className="on" />
                  <span />
                  <span />
                </div>
                <small>Средна сила – добави цифра или символ.</small>
              </div>
              <div className="field-row">
                {role === "student" ? (
                  <div className="field">
                    <label htmlFor="reg-grade">Клас</label>
                    <select id="reg-grade" defaultValue="8">
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                  </div>
                ) : (
                  <div className="field">
                    <label htmlFor="reg-subject">Предмет</label>
                    <select id="reg-subject" defaultValue="Математика">
                      <option>Математика</option>
                      <option>Физика</option>
                      <option>Химия</option>
                      <option>Информатика</option>
                      <option>Биология</option>
                    </select>
                  </div>
                )}
                <div className="field">
                  <label htmlFor="reg-school">
                    Училище <small>(по желание)</small>
                  </label>
                  <input id="reg-school" type="text" placeholder="напр. СМГ, София" />
                </div>
              </div>
              <label className="checkbox">
                <input type="checkbox" /> Приемам <a href="#how" className="auth__link">правилата</a> на Задачник
              </label>
              {role === "student" && (
                <p className="auth__note">
                  Ако си под 14 години, ще изпратим имейл до родител, за да потвърди
                  регистрацията.
                </p>
              )}
              <button type="submit" className="btn btn--primary btn--block">
                Създай профил
              </button>
              <p className="auth__alt muted">
                Вече имаш профил? <a href="#login" className="auth__link">Влез</a>
              </p>
            </form>
          </div>
        </section>
        <section id="states" className="view">
          <div className="page-head">
            <span className="eyebrow">За разработка</span>
            <h1>Състояния на интерфейса</h1>
            <p className="muted">
              Шаблони за React: какво вижда потребителят, докато данните се
              зареждат, когато няма резултати или при грешка.
            </p>
          </div>
          <h2 className="section-title">Зареждане (skeleton)</h2>
          <div className="grid" aria-busy="true" aria-label="Зареждане…">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card task-card skeleton-card">
                <div className="skeleton skeleton--img" />
                <div className="task-card__body">
                  <div className="skeleton-row">
                    <span className="skeleton skeleton--pill" />
                    <span className="skeleton skeleton--pill skeleton--short" />
                  </div>
                  <span className="skeleton skeleton--line" />
                  <span className="skeleton skeleton--line skeleton--w60" />
                  <span className="skeleton skeleton--line skeleton--w40" />
                </div>
              </div>
            ))}
          </div>
          <div className="states-grid">
            <div className="card empty-state">
              <span className="empty-state__icon">🔍</span>
              <h3>Няма задачи по този филтър</h3>
              <p className="muted">
                Опитай с друг клас или предмет – или качи своя задача първи.
              </p>
              <div className="empty-state__actions">
                <button className="btn btn--ghost">Изчисти филтрите</button>
                <a href="#upload" className="btn btn--primary">+ Качи задача</a>
              </div>
            </div>
            <div className="card empty-state">
              <span className="empty-state__icon">✏️</span>
              <h3>Още няма решения</h3>
              <p className="muted">Бъди първият, който ще помогне – и вземи +10 точки.</p>
              <div className="empty-state__actions">
                <a href="#task" className="btn btn--primary">Напиши решение</a>
              </div>
            </div>
            <div className="card empty-state empty-state--error">
              <span className="empty-state__icon">⚠️</span>
              <h3>Нещо се обърка</h3>
              <p className="muted">
                Не успяхме да заредим задачите. Провери интернет връзката си.
              </p>
              <div className="empty-state__actions">
                <button className="btn btn--ghost">↻ Опитай отново</button>
              </div>
            </div>
          </div>
          <h2 className="section-title">Бутони и съобщения</h2>
          <div className="states-row">
            <button className="btn btn--primary" disabled>
              <span className="spinner" /> Публикуване…
            </button>
            <div className="toast toast--success">✓ Решението е публикувано · +10 т.</div>
            <div className="toast toast--error">✕ Снимката е по-голяма от 10 MB</div>
          </div>
        </section>
        <section id="not-found" className="view">
          <div className="not-found">
            <div className="paper not-found__paper">
              404 = x
              <br />
              x ∉ ℝ
            </div>
            <h1>Тази страница я няма</h1>
            <p className="muted">
              Като уравнение без решение – търсихме навсякъде, но не я намерихме.
              Може би адресът е сгрешен или страницата е преместена.
            </p>
            <div className="not-found__actions">
              <a href="#home" className="btn btn--primary">Към задачите</a>
              <a href="#blog" className="btn btn--ghost">Към блога</a>
            </div>
          </div>
        </section>
      </main>
      {lightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Снимка на условието"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox__title">Квадратно уравнение с цели корени</span>
            <div className="lightbox__tools">
              <button onClick={() => setZoom((z) => Math.max(1, z - 0.25))} aria-label="Намали">−</button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} aria-label="Увеличи">+</button>
              <button onClick={() => setLightboxOpen(false)} aria-label="Затвори">✕</button>
            </div>
          </div>
          <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <div className="paper paper--lg lightbox__img" style={{ transform: `scale(${zoom})` }}>
              Задача 4.
              <br />
              x² − 5x + 6 = 0<br />
              Намерете корените и проверете.
            </div>
          </div>
          <p className="lightbox__hint">Esc или клик извън снимката за затваряне · +/− за мащаб</p>
        </div>
      )}
      <footer className="footer">
        <div className="container footer__inner">
          <span>© 2026 Задачник · zadachnik.bg</span>
          <nav>
            <a href="#blog">Блог</a>
            <a href="#how">Как работи</a>
            <a href="#how">Правила</a>
            <a href="#login">Вход</a>
            <a href="#">Контакт</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
