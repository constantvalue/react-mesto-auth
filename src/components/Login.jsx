import { useState } from "react";
import * as auth from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
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
    // if (!formValue.username || !formValue.password) {
    //   return;
    // }
    auth
      .signin(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setFormValue({ email: "", password: "" });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <form
        className="login__form"
        name="login__form"
        id="login__form"
        onSubmit={handleSubmit}
      >
        <h2 className="login__heading">Вход</h2>
        <div className="login__inputs">
          <input
            className="login__input"
            placeholder="Email"
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            required
          ></input>
          <input
            className="login__input"
            placeholder="Пароль"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};
