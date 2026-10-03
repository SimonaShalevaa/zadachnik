import Avatar from "../components/Avatar";
import Paper from "../components/Paper";
import Callout from "../components/Callout";
import SideBox from "../components/SideBox";
import SideTaskList from "../components/SideTaskList";
import { ARTICLE_SECTIONS, getPost } from "../data/posts";
import { SIMILAR_TASKS } from "../data/tasks";
import { getUser } from "../data/users";
import { formatPoints } from "../utils/format";

const ARTICLE_TAGS = ["уравнения", "дискриминанта", "НВО"];
const RELATED_SLUGS = ["greshki-nvo", "zakoni-na-nyuton", "python-zadachi"];

function scrollToSection(e) {
  e.preventDefault();
  const id = e.currentTarget.getAttribute("href").slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ArticlePage() {
  const post = getPost("kvadratni-uravnenia");
  const author = getUser(post.authorId);
  const related = RELATED_SLUGS.map(getPost);
  const [what, discriminant, example, practice] = ARTICLE_SECTIONS;

  return (
    <section id="article" className="view">
      <a href="#blog" className="back">
        ← Към блога
      </a>
      <div className="article-layout">
        <article className="card article">
          <div className={`article__cover blog-card__cover--${post.cover}`}>
            <span>{post.symbol}</span>
          </div>
          <div className="article__content">
            <span className="blog-card__cat">{post.category} · 8 клас</span>
            <h1>{post.title}</h1>
            <div className="article__meta">
              <div className="author">
                <Avatar user={author} />
                <div>
                  <strong>{author.name}</strong>
                  <small>
                    {post.date} · {post.readTime} мин четене
                  </small>
                </div>
              </div>
              <div className="article__share">
                <button className="btn btn--ghost">🔖 Запази</button>
                <button className="btn btn--ghost">↗ Сподели</button>
              </div>
            </div>
            <p className="article__lead">
              Квадратното уравнение изглежда страшно само докато не видиш, че винаги се решава по един
              и същи начин. Ето го.
            </p>
            <h2 id={what.id}>{what.title}</h2>
            <p>
              Уравнение от вида <code>ax² + bx + c = 0</code>, където a ≠ 0. Числата a, b и c се
              наричат коефициенти.
            </p>
            <h2 id={discriminant.id}>{discriminant.title}</h2>
            <p>Първо пресмятаме дискриминантата – тя казва колко корена има уравнението:</p>
            <Paper lines={["D = b² − 4ac"]} size="sm" className="article__formula" />
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
            <Callout type="tip" title="💡 Трик">
              Ако a = 1, потърси две числа със сбор −b и произведение c. За x² − 5x + 6 = 0 това са 2
              и 3.
            </Callout>
            <h2 id={example.id}>{example.title}</h2>
            <p>Да решим x² − 5x + 6 = 0:</p>
            <Paper lines={["D = 25 − 24 = 1 → x₁ = 3, x₂ = 2"]} size="sm" className="article__formula" />
            <Callout type="warn" title="⚠ Честа грешка">
              Забравен знак минус пред b във формулата за корените.
            </Callout>
            <h2 id={practice.id}>{practice.title}</h2>
            <p>Опитай тези задачи от Задачник и провери решенията на другите:</p>
            <SideTaskList tasks={SIMILAR_TASKS.slice(0, 2)} className="article__practice" />
            <div className="article__tags tags">
              {ARTICLE_TAGS.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="article__footer">
              <button className="btn btn--ghost">👍 Полезна (48)</button>
              <button className="link-btn">💬 Коментари (6)</button>
            </div>
          </div>
        </article>
        <aside className="sidebar">
          <SideBox title="Съдържание">
            <ol className="toc">
              {ARTICLE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={scrollToSection}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </SideBox>
          <SideBox className="author-box">
            <Avatar user={author} size="lg" />
            <strong>{author.name}</strong>
            <small className="muted">
              {author.grade} клас · ⭐ {formatPoints(author.points)} т.
            </small>
            <p className="muted">{author.bio}</p>
          </SideBox>
          <SideBox title="Още статии">
            <ul className="side-list">
              {related.map((p) => (
                <li key={p.slug}>
                  <a href="#article">{p.shortTitle ?? p.title}</a>
                </li>
              ))}
            </ul>
          </SideBox>
        </aside>
      </div>
    </section>
  );
}

export default ArticlePage;
