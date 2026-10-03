import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";
import { SUBJECTS, GRADES } from "../data/subjects";

const PERKS = ["🤝 Над 3 900 решения от съученици", "🏆 Седмична класация и значки", "🆓 Безплатно и без реклами"];

const ROLES = [
  { id: "student", label: "🎒 Ученик" },
  { id: "teacher", label: "🍎 Учител" },
];

function RegisterPage() {
  const [role, setRole] = useState("student");
  const isStudent = role === "student";

  return (
    <AuthLayout id="register" title="Присъедини се към Задачник" perks={PERKS} active="register">
      <div className="role-switch" role="radiogroup" aria-label="Роля">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={role === r.id}
            className={role === r.id ? "role-switch__opt role-switch__opt--active" : "role-switch__opt"}
            onClick={() => setRole(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="reg-name">Име и фамилия</label>
        <input id="reg-name" type="text" placeholder="напр. Мария Петрова" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="reg-email">Имейл</label>
        <input id="reg-email" type="email" placeholder="ime@primer.bg" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="reg-pw">Парола</label>
        <PasswordField id="reg-pw" placeholder="поне 8 символа" autoComplete="new-password" />
        <div className="pw-strength" aria-hidden="true">
          <span className="on" />
          <span className="on" />
          <span />
          <span />
        </div>
        <small>Средна сила – добави цифра или символ.</small>
      </div>
      <div className="field-row">
        {isStudent ? (
          <div className="field">
            <label htmlFor="reg-grade">Клас</label>
            <select id="reg-grade" defaultValue="8">
              {GRADES.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="field">
            <label htmlFor="reg-subject">Предмет</label>
            <select id="reg-subject">
              {SUBJECTS.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
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
        <input type="checkbox" /> Приемам{" "}
        <a href="#how" className="auth__link">
          правилата
        </a>{" "}
        на Задачник
      </label>
      {isStudent && (
        <p className="auth__note">
          Ако си под 14 години, ще изпратим имейл до родител, за да потвърди регистрацията.
        </p>
      )}
      <button type="submit" className="btn btn--primary btn--block">
        Създай профил
      </button>
      <p className="auth__alt muted">
        Вече имаш профил?{" "}
        <a href="#login" className="auth__link">
          Влез
        </a>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
