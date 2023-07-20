import logo from "../images/header__logo.svg";

export function Header({ onClick, userEmail, buttonCaption }) {
  return (
    <header className="header">
      <img src={logo} alt="Место лого" className="header__logo" />
      <div className="header__navbar">
        <p className="header__navbar-email">{userEmail}</p>
        <p
          className="header__navbar-logout"
          onClick={onClick}
        >{buttonCaption}</p>
      </div>
    </header>
  );
}
