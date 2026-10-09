import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";

function LoginPage() {
  const { login } = useContext(UserContext);

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!values.email.trim()) {
      newErrors.email = "Въведи имейл.";
    } else if (!values.email.includes("@")) {
      newErrors.email = "Имейлът не е валиден.";
    }
    if (!values.password) {
      newErrors.password = "Въведи парола.";
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSending(true);
    try {
      await login(values.email.trim(), values.password);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section>
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

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="auth__tabs">
            <Link to="/login" className="auth__tab auth__tab--active">
              Вход
            </Link>
            <Link to="/register" className="auth__tab">
              Регистрация
            </Link>
          </div>

          {serverError && <div className="form-alert">{serverError}</div>}

          <div className="field">
            <label htmlFor="login-email">Имейл</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="ime@primer.bg"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </div>
          <div className="field">
            <label htmlFor="login-password">Парола</label>
            <div className="pw-field">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Скрий" : "Покажи"}
              </button>
            </div>
            {errors.password && <small className="field-error">{errors.password}</small>}
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={isSending}>
            {isSending ? "Влизане…" : "Влез"}
          </button>
          <p className="auth__alt muted">
            Нямаш профил?{" "}
            <Link to="/register" className="auth__link">
              Регистрирай се
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
