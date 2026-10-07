import { useState } from "react";
import { Link, NavLink } from "react-router";
import Notifications from "./Notifications";
import { users, currentUserId } from "../data/users";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = users.find((u) => u.id === currentUserId);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo__mark">∑</span>
          <span className="logo__text">Задачник</span>
        </Link>

        <input
          type="checkbox"
          id="nav-toggle"
          className="nav-toggle"
          checked={menuOpen}
          onChange={(e) => setMenuOpen(e.target.checked)}
        />
        <label htmlFor="nav-toggle" className="nav-burger">
          <span />
        </label>

        <nav className="nav">
          <NavLink to="/tasks" className="nav__link" onClick={closeMenu}>
            Задачи
          </NavLink>
          <NavLink to="/leaderboard" className="nav__link" onClick={closeMenu}>
            Класация
          </NavLink>
          <NavLink to="/blog" className="nav__link" onClick={closeMenu}>
            Блог
          </NavLink>
          <NavLink to={"/users/" + user.id} className="nav__link" onClick={closeMenu}>
            Моят профил
          </NavLink>
          <div className="nav__search">
            <input type="search" placeholder="Търси задача…" />
          </div>
          <Link to="/upload" className="btn btn--primary" onClick={closeMenu}>
            + Качи задача
          </Link>
        </nav>

        <Notifications />
        <Link to={"/users/" + user.id} className="avatar header__avatar">
          {user.initials}
        </Link>
      </div>
    </header>
  );
}

export default Header;
