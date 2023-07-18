import logo from "../images/header__logo.svg";

export function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Место лого" className="header__logo" />
    </header>
  );
}
