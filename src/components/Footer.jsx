import "../styles/Footer.css";
import logo from "../assets/logo2.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img src={logo} alt="logo" className="footer-logo" />

        <div className="footer-info">
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@skan.ru</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
