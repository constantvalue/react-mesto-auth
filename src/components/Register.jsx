import { Link } from "react-router-dom";

export function Register(props) {
  return (
    <div className="register">
      <form className="register__form">
        <h2 className="register__heading">Регистрация</h2>
        <div className="register__inputs">
          <input
            className="register__input"
            placeholder="Email"
            type="email"
            required
          ></input>
          <input
            className="register__input"
            placeholder="Пароль"
            type="password"
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
}
