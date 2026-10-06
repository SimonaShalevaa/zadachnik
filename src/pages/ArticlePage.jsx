import Paper from "../components/Paper";

function ArticlePage() {
  function scrollTo(e, id) {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="article" className="view">
      <a href="#blog" className="back">
        ← Към блога
      </a>
      <div className="article-layout">
        <article className="card article">
          <div className="article__cover blog-card__cover--math">
            <span>x²</span>
          </div>
          <div className="article__content">
            <span className="blog-card__cat">Математика · 8 клас</span>
            <h1>Квадратни уравнения за 3 минути: пълно ръководство</h1>
            <div className="article__meta">
              <div className="author">
                <span className="avatar avatar--sm avatar--alt">ЕК</span>
                <div>
                  <strong>Елена К.</strong>
                  <small>12 септ. 2026 · 6 мин четене</small>
                </div>
              </div>
              <div className="article__share">
                <button className="btn btn--ghost">🔖 Запази</button>
                <button className="btn btn--ghost">↗ Сподели</button>
              </div>
            </div>

            <p className="article__lead">
              Квадратното уравнение изглежда страшно само докато не видиш, че винаги се решава по един и
              същи начин. Ето го.
            </p>

            <h2 id="what">Какво е квадратно уравнение</h2>
            <p>
              Уравнение от вида <code>ax² + bx + c = 0</code>, където a ≠ 0. Числата a, b и c се
              наричат коефициенти.
            </p>

            <h2 id="discriminant">Дискриминанта</h2>
            <p>Първо пресмятаме дискриминантата – тя казва колко корена има уравнението:</p>
            <Paper lines={["D = b² − 4ac"]} className="paper--sm article__formula" />
            <ul>
              <li>
                <strong>D &gt; 0</strong> – два различни корена
              </li>
              <li>
                <strong>D = 0</strong> – един (двоен) корен
              </li>
              <li>
                <strong>D &lt; 0</strong> – няма реални корени
              </li>
            </ul>
            <div className="callout callout--tip">
              <strong>💡 Трик</strong>
              <p>
                Ако a = 1, потърси две числа със сбор −b и произведение c. За x² − 5x + 6 = 0 това са 2
                и 3.
              </p>
            </div>

            <h2 id="example">Решен пример</h2>
            <p>Да решим x² − 5x + 6 = 0:</p>
            <Paper lines={["D = 25 − 24 = 1 → x₁ = 3, x₂ = 2"]} className="paper--sm article__formula" />
            <div className="callout callout--warn">
              <strong>⚠ Честа грешка</strong>
              <p>Забравен знак минус пред b във формулата за корените.</p>
            </div>

            <h2 id="practice">Упражни се</h2>
            <p>Опитай тези задачи от Задачник и провери решенията на другите:</p>
            <ul className="side-list article__practice">
              <li>
                <a href="#task">x² + 2x − 8 = 0</a>
                <span className="tag">8 кл.</span>
              </li>
              <li>
                <a href="#task">Формули на Виет</a>
                <span className="tag">8 кл.</span>
              </li>
            </ul>
            <div className="article__tags tags">
              <span className="tag">уравнения</span>
              <span className="tag">дискриминанта</span>
              <span className="tag">НВО</span>
            </div>
            <div className="article__footer">
              <button className="btn btn--ghost">👍 Полезна (48)</button>
              <button className="link-btn">💬 Коментари (6)</button>
            </div>
          </div>
        </article>

        <aside className="sidebar">
          <div className="card side-box">
            <h3>Съдържание</h3>
            <ol className="toc">
              <li>
                <a href="#what" onClick={(e) => scrollTo(e, "what")}>
                  Какво е квадратно уравнение
                </a>
              </li>
              <li>
                <a href="#discriminant" onClick={(e) => scrollTo(e, "discriminant")}>
                  Дискриминанта
                </a>
              </li>
              <li>
                <a href="#example" onClick={(e) => scrollTo(e, "example")}>
                  Решен пример
                </a>
              </li>
              <li>
                <a href="#practice" onClick={(e) => scrollTo(e, "practice")}>
                  Упражни се
                </a>
              </li>
            </ol>
          </div>
          <div className="card side-box author-box">
            <span className="avatar avatar--lg avatar--alt">ЕК</span>
            <strong>Елена К.</strong>
            <small className="muted">11 клас · ⭐ 1 240 т.</small>
            <p className="muted">Обича алгебрата и да обяснява с примери.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ArticlePage;
