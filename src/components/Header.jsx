import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.svg";
import { isAuth } from "../utils/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-left">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <nav className="header-center">
          <Link to="/">Главная</Link>
          <a href="#">Тарифы</a>
          <a href="#">FAQ</a>
        </nav>

        <div className="header-right">
          {isAuth() ? (
            <button onClick={handleLogout} className="login-btn">
              Выйти
            </button>
          ) : location.pathname === "/login" ? null : (
            <>
              <span className="register" onClick={() => navigate("/login")}>
                Зарегистрироваться
              </span>

              <button className="login-btn" onClick={() => navigate("/login")}>
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
