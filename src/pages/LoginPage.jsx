import { useState } from "react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
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

        <form className="auth__form">
          <div className="auth__tabs">
            <a href="#login" className="auth__tab auth__tab--active">
              Вход
            </a>
            <a href="#register" className="auth__tab">
              Регистрация
            </a>
          </div>
          <div className="field">
            <label htmlFor="login-email">Имейл</label>
            <input id="login-email" type="email" placeholder="ime@primer.bg" />
          </div>
          <div className="field">
            <label htmlFor="login-password">Парола</label>
            <div className="pw-field">
              <input id="login-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Скрий" : "Покажи"}
              </button>
            </div>
          </div>
          <div className="auth__row">
            <label className="checkbox">
              <input type="checkbox" /> Запомни ме
            </label>
            <a href="#login" className="auth__link">
              Забравена парола?
            </a>
          </div>
          <button type="button" className="btn btn--primary btn--block">
            Влез
          </button>
          <p className="auth__alt muted">
            Нямаш профил?{" "}
            <a href="#register" className="auth__link">
              Регистрирай се
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
