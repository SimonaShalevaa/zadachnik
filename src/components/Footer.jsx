import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© 2026 Задачник · zadachnik.bg</span>
        <nav>
          <Link to="/blog">Блог</Link>
          <Link to="/how-it-works">Как работи</Link>
          <Link to="/login">Вход</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
