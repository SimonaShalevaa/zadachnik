import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { createSolution } from "../services/solutionService";

const MAX_SIZE_MB = 5;
const emptySolution = { hint: "", text: "" };

function SolutionForm({ taskId, onAdded }) {
  const { user } = useContext(UserContext);

  const [values, setValues] = useState(emptySolution);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) {
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function removeFile() {
    setFile(null);
    setPreview("");
  }

  function validate() {
    const newErrors = {};

    const text = values.text.trim();
    if (text.length < 10) {
      newErrors.text = "Решението трябва да е поне 10 символа.";
    } else if (text.length > 2000) {
      newErrors.text = "Решението трябва да е до 2000 символа.";
    }

    if (values.hint.length > 300) {
      newErrors.hint = "Подсказката трябва да е до 300 символа.";
    }

    if (file) {
      if (!file.type.startsWith("image/")) {
        newErrors.file = "Файлът трябва да е снимка.";
      } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        newErrors.file = "Снимката трябва да е до " + MAX_SIZE_MB + " MB.";
      }
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSending(true);
    try {
      const solution = await createSolution(
        { hint: values.hint.trim(), text: values.text.trim() },
        file,
        taskId,
        user.id
      );
      onAdded(solution);
      setValues(emptySolution);
      setFile(null);
      setPreview("");
    } catch (err) {
      setServerError(err.message);
    }
    setIsSending(false);
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      <h2>Добави решение</h2>
      {serverError && <div className="form-alert">{serverError}</div>}

      <div className="field">
        <label htmlFor="hint">
          Подсказка <small>(по желание)</small>
        </label>
        <input
          id="hint"
          name="hint"
          type="text"
          placeholder="Малък съвет, без да издаваш отговора"
          value={values.hint}
          onChange={handleChange}
        />
        {errors.hint && <small className="field-error">{errors.hint}</small>}
      </div>

      <div className="field">
        <label htmlFor="text">
          Решение <small>(поне 10 символа)</small>
        </label>
        <textarea
          id="text"
          name="text"
          rows={5}
          placeholder="Опиши решението стъпка по стъпка…"
          value={values.text}
          onChange={handleChange}
          className={errors.text ? "input-error" : ""}
        />
        <small className="muted">{values.text.length}/2000</small>
        {errors.text && <small className="field-error">{errors.text}</small>}
      </div>

      {preview ? (
        <div className="solution-form__preview">
          <img src={preview} alt="Преглед" />
          <button type="button" className="link-btn" onClick={removeFile}>
            ✕ Махни снимката
          </button>
        </div>
      ) : (
        <label className="dropzone dropzone--sm">
          <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          <span>📷 Прикачи снимка на решението (по желание)</span>
        </label>
      )}
      {errors.file && <small className="field-error">{errors.file}</small>}

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={isSending}>
          {isSending ? "Публикуване…" : "Публикувай решение"}
        </button>
      </div>
    </form>
  );
}

export default SolutionForm;
