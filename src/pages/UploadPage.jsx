import { subjects, grades } from "../data/tasks";

function UploadPage() {
  return (
    <section id="upload" className="view">
      <div className="narrow">
        <h1>Качи нова задача</h1>
        <p className="muted">Снимай условието ясно и на добра светлина.</p>
        <form className="card form-card">
          <label className="dropzone">
            <input type="file" accept="image/*" hidden />
            <span className="dropzone__icon">📷</span>
            <strong>Пусни снимка тук или кликни</strong>
            <small>JPG, PNG до 10 MB</small>
          </label>
          <div className="field">
            <label htmlFor="title">Заглавие</label>
            <input id="title" type="text" placeholder="напр. Квадратно уравнение с параметър" />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="subject">Предмет</label>
              <select id="subject">
                {Object.entries(subjects).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="grade">Клас</label>
              <select id="grade" defaultValue="8">
                {grades.map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="note">
              Какво точно не ти е ясно? <small>(по желание)</small>
            </label>
            <textarea id="note" rows={3} placeholder="Помага на останалите да ти обяснят по-добре" />
          </div>
          <div className="field">
            <label htmlFor="tags">Етикети</label>
            <input id="tags" type="text" placeholder="уравнения, дискриминанта" />
          </div>
          <div className="form-actions">
            <a href="#home" className="btn btn--ghost">
              Отказ
            </a>
            <button type="button" className="btn btn--primary">
              Публикувай
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UploadPage;
