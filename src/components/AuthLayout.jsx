function AuthLayout({ id, title, perks, active, children }) {
  return (
    <section id={id} className="view">
      <div className="card auth">
        <div className="auth__aside">
          <span className="logo__mark">∑</span>
          <h2>{title}</h2>
          <ul className="auth__perks">
            {perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </div>
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth__tabs">
            <a href="#login" className={active === "login" ? "auth__tab auth__tab--active" : "auth__tab"}>
              Вход
            </a>
            <a href="#register" className={active === "register" ? "auth__tab auth__tab--active" : "auth__tab"}>
              Регистрация
            </a>
          </div>
          {children}
        </form>
      </div>
    </section>
  );
}

export default AuthLayout;
