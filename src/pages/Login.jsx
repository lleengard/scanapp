import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginImg from "../assets/login.png";
import { loginRequest } from "../api/api";

const Login = ({ setIsAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isValid = login.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      const data = await loginRequest(login, password);

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("expire", data.expire);

      setIsAuth(true);
      navigate("/");
    } catch (err) {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <section className="login container">
      <div className="login-left">
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <img src={loginImg} alt="login" />
      </div>

      <div className="login-right">
        <h2>{isLogin ? "Войти" : "Регистрация"}</h2>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Войти
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Зарегистрироваться
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин или номер телефона"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={!isValid}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="login-social">
          <p>Войти через:</p>
          <div className="social-buttons">
            <button className="social-btn google">G</button>
            <button className="social-btn facebook">f</button>
            <button className="social-btn yandex">Я</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
