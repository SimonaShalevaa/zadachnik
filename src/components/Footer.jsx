import { FOOTER_LINKS } from "../data/navigation";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© 2026 Задачник · zadachnik.bg</span>
        <nav>
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
