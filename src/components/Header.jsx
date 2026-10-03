import Notifications from "./Notifications";
import { NAV_LINKS } from "../data/navigation";
import { CURRENT_USER } from "../data/users";

function Header() {
  return (
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
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
          <div className="nav__search">
            <input type="search" placeholder="Търси задача…" />
          </div>
          <a href="#upload" className="btn btn--primary">
            + Качи задача
          </a>
        </nav>
        <Notifications />
        <a href="#profile" className="avatar header__avatar" title={CURRENT_USER.name}>
          {CURRENT_USER.initials}
        </a>
      </div>
    </header>
  );
}

export default Header;
