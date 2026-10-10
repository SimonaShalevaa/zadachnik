import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { createTask } from "../services/taskService";
import { subjects, grades } from "../data/tasks";

const MAX_SIZE_MB = 5;

function UploadPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    subject: "math",
    grade: "8",
    note: "",
    tags: "",
  });
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

  function validate() {
    const newErrors = {};
    if (!file) {
      newErrors.file = "Добави снимка на задачата.";
    } else if (!file.type.startsWith("image/")) {
      newErrors.file = "Файлът трябва да е снимка.";
    } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      newErrors.file = "Снимката трябва да е до " + MAX_SIZE_MB + " MB.";
    }

    const title = values.title.trim();
    if (title.length < 5) {
      newErrors.title = "Заглавието трябва да е поне 5 символа.";
    } else if (title.length > 100) {
      newErrors.title = "Заглавието трябва да е до 100 символа.";
    }

    if (values.note.length > 500) {
      newErrors.note = "Описанието трябва да е до 500 символа.";
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
      const task = await createTask({ ...values, title: values.title.trim() }, file, user.id);
      navigate("/tasks/" + task.id);
    } catch (err) {
      setServerError(err.message);
      setIsSending(false);
    }
  }

  return (
    <section>
      <div className="narrow">
        <h1>Качи нова задача</h1>
        <p className="muted">Снимай условието ясно и на добра светлина.</p>
        <form className="card form-card" onSubmit={handleSubmit} noValidate>
          {serverError && <div className="form-alert">{serverError}</div>}

          <label className="dropzone">
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            {preview ? (
              <img src={preview} alt="Преглед" className="dropzone__preview" />
            ) : (
              <>
                <span className="dropzone__icon">📷</span>
                <strong>Избери снимка</strong>
                <small>JPG или PNG до {MAX_SIZE_MB} MB</small>
              </>
            )}
          </label>
          {errors.file && <small className="field-error">{errors.file}</small>}

          <div className="field">
            <label htmlFor="title">Заглавие</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="напр. Квадратно уравнение с параметър"
              value={values.title}
              onChange={handleChange}
            />
            {errors.title && <small className="field-error">{errors.title}</small>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="subject">Предмет</label>
              <select id="subject" name="subject" value={values.subject} onChange={handleChange}>
                {Object.entries(subjects).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="grade">Клас</label>
              <select id="grade" name="grade" value={values.grade} onChange={handleChange}>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="note">
              Какво точно не ти е ясно? <small>(по желание)</small>
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              placeholder="Помага на останалите да ти обяснят по-добре"
              value={values.note}
              onChange={handleChange}
            />
            <small className="muted">{values.note.length}/500</small>
            {errors.note && <small className="field-error">{errors.note}</small>}
          </div>

          <div className="field">
            <label htmlFor="tags">
              Етикети <small>(разделени със запетая)</small>
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="уравнения, дискриминанта"
              value={values.tags}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Link to="/tasks" className="btn btn--ghost">
              Отказ
            </Link>
            <button type="submit" className="btn btn--primary" disabled={isSending}>
              {isSending ? "Публикуване…" : "Публикувай"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UploadPage;
