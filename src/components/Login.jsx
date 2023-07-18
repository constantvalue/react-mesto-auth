export function Login(props) {
  return (
    <div className="login">
      <form className="login__form">
        <h2 className="login__heading">Вход</h2>
        <div className="login__inputs">
          <input
            className="login__input"
            placeholder="Email"
            type="email"
            required
          ></input>
          <input
            className="login__input"
            placeholder="Пароль"
            type="password"
            required
          ></input>
        </div>
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
