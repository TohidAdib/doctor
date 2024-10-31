import { Link } from "react-router-dom";
import Footer from "./footer";
import Header from "./header"
import "../components/static/css/main.css";
const Main = () => {
  return (
    <>
      <Header/>
      <main>
        <section>
          <div className="box box1">
            <Link to="visit" className="lin">
              دریافت نوبت
            </Link>
          </div>
          <div className="box box2">
            <Link to="takenvisit" className="lin">
              نوبت های گرفته شده
            </Link>
          </div>
        </section>
        <section>
          <div className="box box3">
            <Link to="takenvisited" className="lin">
              نوبت های ویزیت شده
            </Link>
          </div>
          <div className="box box4">
            <Link className="lin">درباره ما</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;
