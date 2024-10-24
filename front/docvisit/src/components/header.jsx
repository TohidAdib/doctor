import { Link } from "react-router-dom";
import axiosInstance from "../axios/axios";
import { useState, useEffect } from "react";
import "../components/static/css/main.css";
const Header = () => {
  const token = localStorage.getItem("token");
  const [userStaff, setUserStaff] = useState(null);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("user/");
          setUserStaff(response.data.is_staff);
        } catch (error) {
          setErrors("مشکلی پیش آمده لطفا مجددا امتحان کنید");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <header>
      {localStorage.getItem("token") ? (
        <div className="header_div">
          <Link className="btn btn-danger" to="logout/">
            خروج
          </Link>
        </div>
      ) : (
        <div className="header_div">
          <Link className="btn btn-primary" to="rigester/">
            ورود/ثبت نام
          </Link>
        </div>
      )}

      <div className="header_div">
        <h1 style={{ color: "white" }}>دکتر ....</h1>
      </div>

      {userStaff && (
        <div className="header_div">
          <Link className="btn btn-success" to="admin">
            پنل ادمین
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
