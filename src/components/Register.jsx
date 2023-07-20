import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

export const Register = ({ handleInfotooltip, handleSuccess, handleFail }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.password !== "") {
      auth.signUp(formValue.email, formValue.password).then(() => {
        handleInfotooltip();
        handleSuccess()
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        handleInfotooltip();
        handleFail()
      })
    }
  };

  return (
    <div className="register">
      <form
        className="register__form"
        name="register__form"
        id="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="register__heading">Регистрация</h2>
        <div className="register__inputs">
          <input
            className="register__input"
            placeholder="Email"
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            required
          ></input>
          <input
            className="register__input"
            placeholder="Пароль"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/signin" className="register__signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};
