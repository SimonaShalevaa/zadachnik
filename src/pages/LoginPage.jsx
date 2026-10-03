import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";

const PERKS = ["📷 Качвай задачи и получавай решения", "⭐ Събирай точки и значки", "🔖 Запазвай полезни решения"];

function LoginPage() {
  return (
    <AuthLayout id="login" title="Добре дошъл отново!" perks={PERKS} active="login">
      <button type="button" className="btn btn--ghost btn--block">
        <span className="g-mark">G</span> Продължи с Google
      </button>
      <div className="divider">
        <span>или с имейл</span>
      </div>
      <div className="field">
        <label htmlFor="login-email">Имейл</label>
        <input id="login-email" type="email" placeholder="ime@primer.bg" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="login-pw">Парола</label>
        <PasswordField id="login-pw" placeholder="••••••••" autoComplete="current-password" />
      </div>
      <div className="auth__row">
        <label className="checkbox">
          <input type="checkbox" defaultChecked /> Запомни ме
        </label>
        <a href="#login" className="auth__link">
          Забравена парола?
        </a>
      </div>
      <button type="submit" className="btn btn--primary btn--block">
        Влез
      </button>
      <p className="auth__alt muted">
        Нямаш профил?{" "}
        <a href="#register" className="auth__link">
          Регистрирай се
        </a>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
