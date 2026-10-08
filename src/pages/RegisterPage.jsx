import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { grades } from "../data/tasks";

function RegisterPage() {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
    role: "student",
    grade: "8",
    school: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  }

  function validate() {
    const newErrors = {};
    if (values.fullName.trim().length < 3) {
      newErrors.fullName = "Името трябва да е поне 3 символа.";
    }
    if (!values.email.includes("@") || !values.email.includes(".")) {
      newErrors.email = "Въведи валиден имейл.";
    }
    if (values.password.length < 6) {
      newErrors.password = "Паролата трябва да е поне 6 символа.";
    } else if (!/\d/.test(values.password)) {
      newErrors.password = "Паролата трябва да съдържа поне една цифра.";
    }
    if (values.rePassword !== values.password) {
      newErrors.rePassword = "Паролите не съвпадат.";
    }
    if (!values.terms) {
      newErrors.terms = "Трябва да приемеш правилата.";
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
      await register({ ...values, fullName: values.fullName.trim(), email: values.email.trim() });
      navigate("/");
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
          <h2>Присъедини се към Задачник</h2>
          <ul className="auth__perks">
            <li>🤝 Помощ от съученици</li>
            <li>🏆 Седмична класация и значки</li>
            <li>🆓 Безплатно и без реклами</li>
          </ul>
        </div>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="auth__tabs">
            <Link to="/login" className="auth__tab">
              Вход
            </Link>
            <Link to="/register" className="auth__tab auth__tab--active">
              Регистрация
            </Link>
          </div>

          {serverError && <div className="form-alert">{serverError}</div>}

          <div className="role-switch">
            <button
              type="button"
              className={values.role === "student" ? "role-switch__opt role-switch__opt--active" : "role-switch__opt"}
              onClick={() => setValues({ ...values, role: "student" })}
            >
              🎒 Ученик
            </button>
            <button
              type="button"
              className={values.role === "teacher" ? "role-switch__opt role-switch__opt--active" : "role-switch__opt"}
              onClick={() => setValues({ ...values, role: "teacher" })}
            >
              🍎 Учител
            </button>
          </div>

          <div className="field">
            <label htmlFor="reg-name">Име и фамилия</label>
            <input
              id="reg-name"
              name="fullName"
              type="text"
              placeholder="напр. Мария Петрова"
              value={values.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <small className="field-error">{errors.fullName}</small>}
          </div>
          <div className="field">
            <label htmlFor="reg-email">Имейл</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="ime@primer.bg"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </div>
          <div className="field">
            <label htmlFor="reg-password">Парола</label>
            <div className="pw-field">
              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="поне 6 символа и една цифра"
                value={values.password}
                onChange={handleChange}
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Скрий" : "Покажи"}
              </button>
            </div>
            {errors.password && <small className="field-error">{errors.password}</small>}
          </div>
          <div className="field">
            <label htmlFor="reg-repassword">Повтори паролата</label>
            <input
              id="reg-repassword"
              name="rePassword"
              type={showPassword ? "text" : "password"}
              value={values.rePassword}
              onChange={handleChange}
            />
            {errors.rePassword && <small className="field-error">{errors.rePassword}</small>}
          </div>

          <div className="field-row">
            {values.role === "student" && (
              <div className="field">
                <label htmlFor="reg-grade">Клас</label>
                <select id="reg-grade" name="grade" value={values.grade} onChange={handleChange}>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="field">
              <label htmlFor="reg-school">
                Училище <small>(по желание)</small>
              </label>
              <input
                id="reg-school"
                name="school"
                type="text"
                placeholder="напр. СМГ, София"
                value={values.school}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="checkbox">
              <input type="checkbox" name="terms" checked={values.terms} onChange={handleChange} /> Приемам
              правилата на Задачник
            </label>
            {errors.terms && <small className="field-error">{errors.terms}</small>}
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={isSending}>
            {isSending ? "Създаване…" : "Създай профил"}
          </button>
          <p className="auth__alt muted">
            Вече имаш профил?{" "}
            <Link to="/login" className="auth__link">
              Влез
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
