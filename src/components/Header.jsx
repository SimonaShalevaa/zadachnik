import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Notifications from "./Notifications";
import { UserContext } from "../contexts/UserContext";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    closeMenu();
    await logout();
    navigate("/");
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
          <div className="nav__search">
            <input type="search" placeholder="Търси задача…" />
          </div>

          {user ? (
            <>
              <Link to="/upload" className="btn btn--primary" onClick={closeMenu}>
                + Качи задача
              </Link>
              <button className="btn btn--ghost" onClick={handleLogout}>
                Изход
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost" onClick={closeMenu}>
                Вход
              </Link>
              <Link to="/register" className="btn btn--primary" onClick={closeMenu}>
                Регистрация
              </Link>
            </>
          )}
        </nav>

        {user && (
          <>
            <Notifications />
            <Link to={"/users/" + user.id} className="avatar header__avatar" title={user.fullName}>
              {user.initials}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
