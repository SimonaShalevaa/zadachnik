import Notifications from "./Notifications";
import { currentUser } from "../data/users";

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#home" className="logo">
          <span className="logo__mark">∑</span>
          <span className="logo__text">Задачник</span>
        </a>

        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-burger">
          <span />
        </label>

        <nav className="nav">
          <a href="#home" className="nav__link">Задачи</a>
          <a href="#leaderboard" className="nav__link">Класация</a>
          <a href="#blog" className="nav__link">Блог</a>
          <a href="#profile" className="nav__link">Моят профил</a>
          <div className="nav__search">
            <input type="search" placeholder="Търси задача…" />
          </div>
          <a href="#upload" className="btn btn--primary">
            + Качи задача
          </a>
        </nav>

        <Notifications />
        <a href="#profile" className="avatar header__avatar">
          {currentUser.initials}
        </a>
      </div>
    </header>
  );
}

export default Header;
