import { Link } from "react-router";
import { steps, pointRules, badges, rules, faq } from "../data/howItWorks";

function HowItWorksPage() {
  return (
    <section>
      <div className="page-head page-head--center">
        <span className="eyebrow">Как работи</span>
        <h1>Ученици помагат на ученици</h1>
        <p className="muted">
          Задачник е място, където можеш да получиш помощ за домашното и да помогнеш на другите –
          безплатно и без реклами.
        </p>
      </div>

      <ol className="steps">
        {steps.map((step, index) => (
          <li className="card step" key={step.title}>
            <span className="step__num">{index + 1}</span>
            <span className="step__icon">{step.icon}</span>
            <h3>{step.title}</h3>
            <p className="muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="how-grid">
        <div className="card side-box">
          <h2>Точкова система</h2>
          <table className="points-table">
            <tbody>
              {pointRules.map((rule) => (
                <tr key={rule.action}>
                  <td>{rule.action}</td>
                  <td className={rule.points > 0 ? "plus" : "minus"}>
                    {rule.points > 0 ? "+" + rule.points : rule.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="how-sub">Значки</h3>
          <div className="badges">
            {badges.map((badge) => (
              <span className="badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="card side-box">
          <h2>Правила</h2>
          <ul className="rules">
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="section-title faq-title">Често задавани въпроси</h2>
      <div className="faq">
        {faq.map((item) => (
          <details className="spoiler" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>

      <div className="card cta">
        <div>
          <h2>Готов ли си да започнеш?</h2>
          <p className="muted">Регистрацията отнема по-малко от минута.</p>
        </div>
        <div className="cta__actions">
          <Link to="/register" className="btn btn--primary">
            Създай профил
          </Link>
          <Link to="/" className="btn btn--ghost">
            Разгледай задачите
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksPage;
