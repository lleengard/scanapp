import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../utils/auth";
import heroImg from "../assets/hero.png";
import emptyImg from "../assets/emptySpace.png";
import clock from "../assets/clock.svg";
import search from "../assets/search.svg";
import shield from "../assets/shield.svg";

import bulb from "../assets/bulb.svg";
import mark from "../assets/mark.svg";
import lapT from "../assets/lapT.svg";

import { useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleClick = () => {
    if (isAuth()) {
      navigate("/search");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <section className="hero full">
        <div className="hero-left">
          <h1>
            СЕРВИС ПОИСКА ПУБЛИКАЦИЙ <br />
            О КОМПАНИИ <br />
            ПО ЕГО ИНН
          </h1>

          <p>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>

          <button className="hero-btn" onClick={handleClick}>
            Запросить данные
          </button>
        </div>

        <div className="hero-right">
          <img src={heroImg} alt="hero" />
        </div>
      </section>

      <section className="why container">
        <h2>Почему именно мы</h2>

        <div className="why-wrapper">
          <button className="arrow" onClick={scrollLeft}>
            ←
          </button>

          <div className="why-cards" ref={sliderRef}>
            <div className="card">
              <img src={clock} alt="" />
              <p>Высокая и оперативная скорость обработки заявки</p>
            </div>

            <div className="card">
              <img src={search} alt="" />
              <p>
                Огромная комплексная база данных, обеспечивающая объективный
                ответ на запрос
              </p>
            </div>

            <div className="card">
              <img src={shield} alt="" />
              <p>
                Защита конфиденциальных сведений, не подлежащих разглашению по
                федеральному законодательству
              </p>
            </div>
          </div>

          <button className="arrow" onClick={scrollRight}>
            →
          </button>
        </div>
      </section>

      <section className="spacer container">
        <img src={emptyImg} alt="" />
      </section>

      <section className="tariffs container">
        <h2>Наши тарифы</h2>

        <div className="tariffs-list">
          <div className="tariff tariff-beginner active">
            <div className="tariff-top">
              <div>
                <h3>Beginner</h3>
                <p>Для небольшого исследования</p>
              </div>
              <img src={bulb} alt="" />
            </div>

            <div className="tariff-body">
              <div className="badge">Текущий тариф</div>

              <div className="tariff-price">
                <span className="price">799 ₽</span>
                <span className="old-price">1 200 ₽</span>
              </div>

              <p className="tariff-limit">
                или 150 ₽/мес при рассрочке на 24 мес
              </p>

              <ul>
                <li>✔️ Безлимитная история запросов</li>
                <li>✔️ Безопасная сделка</li>
                <li>✔️ Поддержка 24/7</li>
              </ul>

              <button className="tariff-btn active-btn">
                Перейти в личный кабинет
              </button>
            </div>
          </div>

          <div className="tariff tariff-pro">
            <div className="tariff-top">
              <div>
                <h3>Pro</h3>
                <p>Для HR и фрилансеров</p>
              </div>
              <img src={mark} alt="" />
            </div>

            <div className="tariff-body">
              <div className="tariff-price">
                <span className="price">1 299 ₽</span>
                <span className="old-price">2 600 ₽</span>
              </div>

              <p className="tariff-limit">
                или 279 ₽/мес при рассрочке на 24 мес
              </p>

              <ul>
                <li>✔️ Все пункты тарифа Beginner</li>
                <li>✔️ Экспорт истории</li>
                <li>✔️ Рекомендации по приоритетам</li>
              </ul>

              <button className="tariff-btn">Подробнее</button>
            </div>
          </div>

          <div className="tariff tariff-business">
            <div className="tariff-top">
              <div>
                <h3>Business</h3>
                <p>Для корпоративных клиентов</p>
              </div>
              <img src={lapT} alt="" />
            </div>

            <div className="tariff-body">
              <div className="tariff-price">
                <span className="price">2 379 ₽</span>
                <span className="old-price">3 700 ₽</span>
              </div>

              <p className="tariff-limit">
                или 799 ₽/мес при рассрочке на 24 мес
              </p>

              <ul>
                <li>✔️ Все пункты тарифа Pro</li>
                <li>✔️ Безлимитное количество запросов</li>
                <li>✔️ Приоритетная поддержка</li>
              </ul>

              <button className="tariff-btn">Подробнее</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
