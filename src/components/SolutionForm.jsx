function SolutionForm() {
  return (
    <article className="card form-card">
      <h2>Добави решение</h2>
      <textarea rows={4} placeholder="Опиши решението си… (поддържа формули, напр. $x^2$)" />
      <label className="dropzone dropzone--sm">
        <input type="file" accept="image/*" multiple hidden />
        <span>📷 Прикачи снимка на решението</span>
      </label>
      <label className="checkbox">
        <input type="checkbox" /> Скрий като спойлер
      </label>
      <div className="form-actions">
        <button className="btn btn--primary">Публикувай решение</button>
      </div>
    </article>
  );
}

export default SolutionForm;
