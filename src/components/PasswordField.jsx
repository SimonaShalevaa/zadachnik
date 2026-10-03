import { useState } from "react";

function PasswordField({ id, placeholder, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="pw-field">
      <input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button type="button" className="pw-toggle" onClick={() => setVisible((v) => !v)}>
        {visible ? "Скрий" : "Покажи"}
      </button>
    </div>
  );
}

export default PasswordField;
