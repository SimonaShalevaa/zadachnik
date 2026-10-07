import { Link } from "react-router";
import { useState } from "react";
import { subjects, grades } from "../data/tasks";

function RegisterPage() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className="card auth">
        <div className="auth__aside">
          <span className="logo__mark">∑</span>
          <h2>Присъедини се към Задачник</h2>
          <ul className="auth__perks">
            <li>🤝 Над 3 900 решения от съученици</li>
            <li>🏆 Седмична класация и значки</li>
            <li>🆓 Безплатно и без реклами</li>
          </ul>
        </div>

        <form className="auth__form">
          <div className="auth__tabs">
            <Link to="/login" className="auth__tab">
              Вход
            </Link>
            <Link to="/register" className="auth__tab auth__tab--active">
              Регистрация
            </Link>
          </div>

          <div className="role-switch">
            <button
              type="button"
              className={role === "student" ? "role-switch__opt role-switch__opt--active" : "role-switch__opt"}
              onClick={() => setRole("student")}
            >
              🎒 Ученик
            </button>
            <button
              type="button"
              className={role === "teacher" ? "role-switch__opt role-switch__opt--active" : "role-switch__opt"}
              onClick={() => setRole("teacher")}
            >
              🍎 Учител
            </button>
          </div>

          <div className="field">
            <label htmlFor="reg-name">Име и фамилия</label>
            <input id="reg-name" type="text" placeholder="напр. Мария Петрова" />
          </div>
          <div className="field">
            <label htmlFor="reg-email">Имейл</label>
            <input id="reg-email" type="email" placeholder="ime@primer.bg" />
          </div>
          <div className="field">
            <label htmlFor="reg-password">Парола</label>
            <div className="pw-field">
              <input id="reg-password" type={showPassword ? "text" : "password"} placeholder="поне 8 символа" />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Скрий" : "Покажи"}
              </button>
            </div>
          </div>

          <div className="field-row">
            {role === "student" ? (
              <div className="field">
                <label htmlFor="reg-grade">Клас</label>
                <select id="reg-grade" defaultValue="8">
                  {grades.map((grade) => (
                    <option key={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="field">
                <label htmlFor="reg-subject">Предмет</label>
                <select id="reg-subject">
                  {Object.entries(subjects).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="field">
              <label htmlFor="reg-school">
                Училище <small>(по желание)</small>
              </label>
              <input id="reg-school" type="text" placeholder="напр. СМГ, София" />
            </div>
          </div>

          <label className="checkbox">
            <input type="checkbox" /> Приемам правилата на Задачник
          </label>
          {role === "student" && (
            <p className="auth__note">
              Ако си под 14 години, ще изпратим имейл до родител, за да потвърди регистрацията.
            </p>
          )}
          <button type="button" className="btn btn--primary btn--block">
            Създай профил
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
