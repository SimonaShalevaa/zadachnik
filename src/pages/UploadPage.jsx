import { SUBJECTS, GRADES } from "../data/subjects";

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
            <label htmlFor="upload-title">Заглавие</label>
            <input id="upload-title" type="text" placeholder="напр. Квадратно уравнение с параметър" />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="upload-subject">Предмет</label>
              <select id="upload-subject">
                {SUBJECTS.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="upload-grade">Клас</label>
              <select id="upload-grade" defaultValue="8">
                {GRADES.map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="upload-note">
              Какво точно не ти е ясно? <small>(по желание)</small>
            </label>
            <textarea id="upload-note" rows={3} placeholder="Помага на останалите да ти обяснят по-добре" />
          </div>
          <div className="field">
            <label htmlFor="upload-tags">Етикети</label>
            <input id="upload-tags" type="text" placeholder="уравнения, дискриминанта" />
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
