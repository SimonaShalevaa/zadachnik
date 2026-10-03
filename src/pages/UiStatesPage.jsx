import TaskCardSkeleton from "../components/TaskCardSkeleton";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";

const SKELETON_COUNT = 4;

function UiStatesPage() {
  return (
    <section id="states" className="view">
      <div className="page-head">
        <span className="eyebrow">За разработка</span>
        <h1>Състояния на интерфейса</h1>
        <p className="muted">
          Шаблони за React: какво вижда потребителят, докато данните се зареждат, когато няма
          резултати или при грешка.
        </p>
      </div>
      <h2 className="section-title">Зареждане (skeleton)</h2>
      <div className="grid" aria-busy="true" aria-label="Зареждане…">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
      <div className="states-grid">
        <EmptyState
          icon="🔍"
          title="Няма задачи по този филтър"
          text="Опитай с друг клас или предмет – или качи своя задача първи."
        >
          <button className="btn btn--ghost">Изчисти филтрите</button>
          <a href="#upload" className="btn btn--primary">
            + Качи задача
          </a>
        </EmptyState>
        <EmptyState icon="✏️" title="Още няма решения" text="Бъди първият, който ще помогне – и вземи +10 точки.">
          <a href="#task" className="btn btn--primary">
            Напиши решение
          </a>
        </EmptyState>
        <EmptyState
          icon="⚠️"
          title="Нещо се обърка"
          text="Не успяхме да заредим задачите. Провери интернет връзката си."
          variant="error"
        >
          <button className="btn btn--ghost">↻ Опитай отново</button>
        </EmptyState>
      </div>
      <h2 className="section-title">Бутони и съобщения</h2>
      <div className="states-row">
        <button className="btn btn--primary" disabled>
          <span className="spinner" /> Публикуване…
        </button>
        <Toast type="success">✓ Решението е публикувано · +10 т.</Toast>
        <Toast type="error">✕ Снимката е по-голяма от 10 MB</Toast>
      </div>
    </section>
  );
}

export default UiStatesPage;
