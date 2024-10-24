import { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { format } from "date-fns";
import jalaali from 'jalaali-js';
import "../components/static/css/takenvisit.css";

const TakenVisited = () => {
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("user/");
        const now = new Date();
        const ISODate = format(now, "yyyy-MM-dd");
        const nowTime = `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
        console.log(ISODate);
        const validUsers = response.data.patientUser.filter(
          (user) => user.visit_date < ISODate
        );
        setUser(validUsers);
      } catch (error) {
        setErrors("مشکلی پیش آمده لطفا مجددا امتحان کنید");
      }
    };

    fetchData();
  }, []);

  const convertToJalaali = (gregorianDate) => {
    const jalaaliDate = jalaali.toJalaali(new Date(gregorianDate));
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  };

  return (
    <div className="container">
      <section class="dv-lg ">
        <div className="t_head">
          <div className="t-th">نام بیمار</div>
          <div className="t-th">کد ملی بیمار</div>
          <div className="t-th">شماره تلفن بیمار</div>
          <div className="t-th">نام پدر بیمار</div>
          <div className="t-th">تاریخ مراجعه</div>
          <div className="t-th">ساعت مراجعه</div>
        </div>

        {user.map((m, i) => (
          <div className="t_body" key={i}>
            <div className="t_td">{m.name}</div>
            <div className="t_td">{m.national_id}</div>
            <div className="t_td"></div>
            <div className="t_td">{m.father_name}</div>
            <div className="t_td">{convertToJalaali(m.visit_date)}</div>
            <div className="t_td">{m.visit_time}</div>
          </div>
        ))}
      </section>
      <section className="dv-sm">
        {user.map((m, i) => (
          <div key={i} className="cont">
            <div className="one_info">
              <span>نام بیمار:</span>
              <span>{m.name}</span>
            </div>
            <div className="one_info">
              <span>کدملی بیمار:</span>
              <span>{m.national_id}</span>
            </div>
            <div className="one_info">
              <span>شماره تماس بیمار:</span>
              <span>{m.name}</span>
            </div>
            <div className="one_info">
              <span>نام پدر بیمار:</span>
              <span>{m.father_name}</span>
            </div>
            <div className="one_info">
              <span>تاریخ مراجعه:</span>
              <span>{convertToJalaali(m.visit_date)}</span>
            </div>
            <div className="one_info">
              <span>زمان مراجعه:</span>
              <span>{m.visit_time}</span>
            </div>
          </div>
        ))}
      </section>
      {errors && <div className="alert alert-danger my-3">{errors}</div>}
    </div>
  );
};

export default TakenVisited;
