import RulesList from "../components/RulesList";
import { STEPS, POINT_RULES, BADGES, SITE_RULES, FAQ } from "../data/howItWorks";

function formatDelta(points) {
  return points > 0 ? `+${points}` : `−${Math.abs(points)}`;
}

function HowItWorksPage() {
  return (
    <section id="how" className="view">
      <div className="page-head page-head--center">
        <span className="eyebrow">Как работи</span>
        <h1>Ученици помагат на ученици</h1>
        <p className="muted">
          Задачник е място, където можеш да получиш помощ за домашното и да помогнеш на другите –
          безплатно и без реклами.
        </p>
      </div>
      <ol className="steps">
        {STEPS.map((step, i) => (
          <li key={step.title} className="card step">
            <span className="step__num">{i + 1}</span>
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
              {POINT_RULES.map((rule) => (
                <tr key={rule.action}>
                  <td>{rule.action}</td>
                  <td className={rule.points > 0 ? "plus" : "minus"}>{formatDelta(rule.points)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="how-sub">Значки</h3>
          <div className="badges">
            {BADGES.map((badge) => (
              <span key={badge} className="badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="card side-box">
          <h2>Правила</h2>
          <RulesList rules={SITE_RULES} />
        </div>
      </div>
      <h2 className="section-title faq-title">Често задавани въпроси</h2>
      <div className="faq">
        {FAQ.map((item) => (
          <details key={item.q} className="spoiler">
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
          <a href="#register" className="btn btn--primary">
            Създай профил
          </a>
          <a href="#home" className="btn btn--ghost">
            Разгледай задачите
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksPage;
