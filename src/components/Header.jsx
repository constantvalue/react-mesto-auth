import logo from "../images/header__logo.svg";


export function Header({onLogOut}) {



  return (
    <header className="header">
      <img src={logo} alt="Место лого" className="header__logo" />
      <div className="navbar">
        <p className="navbar__email"></p>
        <button className="navbar__logout" type="button" onClick={onLogOut}></button>
      </div>
    </header>
  );
}
