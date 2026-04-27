import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ isAuth, setIsAuth }) => {
  return (
    <>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
