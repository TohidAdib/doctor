import axiosInstance from "../axios/axios";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import jalaali from "jalaali-js";
import { format, set } from "date-fns";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "../components/static/css/admin.css";
const Admin = () => {
  const [patients, setPatients] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState("");
  const [massage, setMassage] = useState("");
  const [sending, setSendeing] = useState(false);
  const [phisicalSending, setPhisicalSendeing] = useState(false);
  const [autoVisit, setAutoVisit] = useState({
    date: null,
    from_time: null,
    to_time: null,
    for_time: null,
  });
  const [phisicalVisit, setPhisicalVisit] = useState({
    user: "",
    name: "",
    national_id: "",
    father_name: "",
    description: "",
    email: "",
    visit_date: null,
    visit_time: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("allpatient/");
        const userResponse = await axiosInstance.get("user/");
        setPatients(response.data);
        setUser(userResponse.data);
        setPhisicalVisit((pre) => ({ ...pre, user: userResponse.data.id }));
      } catch (error) {
        setErrors("مشکلی پیش آمده لطفا مجددا امتحان کنید");
      }
    };
    fetchData();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setSendeing(true);
      const response = await axiosInstance.post("autovisit/", autoVisit);
      const response2 = await axiosInstance.get("allpatient/");
      setPatients(response2.data);
      setSendeing(false);
      setMassage("نوبت ها با موفقیت ثبت شدند");
    } catch (error) {
      setErrors("پسوردها یکسان نمیباشد");
      setSendeing(false);
      setMassage("");
    }
  };
  const convertToGregorian = (jy, jm, jd) => {
    const gregorianDate = jalaali.toGregorian(jy, jm, jd);
    const finalDate = new Date(
      gregorianDate.gy,
      gregorianDate.gm - 1,
      gregorianDate.gd
    );
    const ISODate = format(finalDate, "yyyy-MM-dd");
    return ISODate;
  };
  const convertToJalaali = (gregorianDate) => {
    const jalaaliDate = jalaali.toJalaali(new Date(gregorianDate));
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  };
  const handelClick = async (ID) => {
    try {
      setPhisicalSendeing(true);
      const response = await axiosInstance.put(`patient/${ID}/`, phisicalVisit);
      setPhisicalSendeing(false);
    } catch (error) {
      setErrors("پسوردها یکسان نمیباشد");
      setPhisicalSendeing(false);
    }
  };
  const handleSearch = (e) => {
    const input = e.currentTarget;

    const ids = document.querySelectorAll(".na_id");
    ids.forEach((f) => {
      const parent = f.closest(".admin-t_body");
      if (f.innerText.includes(input.value)) {
        parent.style.display = "flex";
      } else {
        parent.style.display = "none";
      }
    });
  };

  return (
    <div className="container-fluied">
      <form onSubmit={handelSubmit} className="auto_visit">
        <div className="lab_inp">
          <label htmlFor="date">در تاریخ:</label>
          <DatePicker
            id="date"
            calendar={persian}
            locale={persian_fa}
            onChange={(value) =>
              setAutoVisit((prevPatient) => ({
                ...prevPatient,
                date: convertToGregorian(value.year, value.month, value.day),
              }))
            }
          />
        </div>
        <div className="lab_inp">
          <label htmlFor="from_time">از ساعت:</label>
          <DatePicker
            disableDayPicker
            format="HH:mm:ss"
            plugins={[<TimePicker />]}
            onChange={(value) =>
              setAutoVisit((prevPatient) => ({
                ...prevPatient,
                from_time: `${value.hour}:${value.minute}:${value.second}`,
              }))
            }
          />
        </div>
        <div className="lab_inp">
          <label htmlFor="to_time">تا ساعت:</label>
          <DatePicker
            disableDayPicker
            format="HH:mm:ss"
            plugins={[<TimePicker />]}
            onChange={(value) =>
              setAutoVisit((prevPatient) => ({
                ...prevPatient,
                to_time: `${value.hour}:${value.minute}:${value.second}`,
              }))
            }
          />
        </div>
        <div className="lab_inp">
          <label htmlFor="for_time">به مدت:</label>
          <DatePicker
            disableDayPicker
            format="HH:mm:ss"
            plugins={[<TimePicker />]}
            onChange={(value) =>
              setAutoVisit((prevPatient) => ({
                ...prevPatient,
                for_time: `${value.hour}:${value.minute}:${value.second}`,
              }))
            }
          />
        </div>
        <div className="lab_inp">
          <button disabled={sending} className="btn btn-primary">
            {sending ? "در حال ثبت ..." : "ثبت"}
          </button>
        </div>
      </form>
      <div className="m-3 text-center">
        <input
          placeholder="جستوجو"
          className="form-control w-50"
          type="search"
          onChange={handleSearch}
        />
      </div>
      <section class="admin-dv-lg ">
        <div className="t_head">
          <div className="admin-t-th">نام بیمار</div>
          <div className="admin-t-th">کد ملی بیمار</div>
          <div className="admin-t-th">نام پدر بیمار</div>
          <div className="admin-t-th">تاریخ مراجعه</div>
          <div className="admin-t-th">ساعت مراجعه</div>
          <div className="admin-t-th"></div>
        </div>

        {patients.map((m, i) => (
          <div className="admin-t_body" key={i}>
            <div className="admin-t_td">{m.name}</div>
            <div className="admin-t_td na_id">{m.national_id}</div>
            <div className="admin-t_td">{m.father_name}</div>
            <div className="admin-t_td">
              <DatePicker
                placeholder={m.visit_date && convertToJalaali(m.visit_date)}
                id="date"
                calendar={persian}
                locale={persian_fa}
                onChange={(value) =>
                  setPhisicalVisit((prevPatient) => ({
                    ...prevPatient,
                    visit_date: convertToGregorian(
                      value.year,
                      value.month,
                      value.day
                    ),
                    name: m.name,
                    national_id: m.national_id,
                    father_name: m.father_name,
                  }))
                }
              />
            </div>
            <div className="admin-t_td">
              <DatePicker
                placeholder={m.visit_time}
                disableDayPicker
                format="HH:mm:ss"
                plugins={[<TimePicker />]}
                onChange={(value) =>
                  setPhisicalVisit((prevPatient) => ({
                    ...prevPatient,
                    visit_time: `${value.hour}:${value.minute}:${value.second}`,
                    name: m.name,
                    national_id: m.national_id,
                    father_name: m.father_name,
                  }))
                }
              />
            </div>
            <div className="admin-t_td">
              <button
                disabled={phisicalSending}
                onClick={() => handelClick(m.id)}
                className="btn btn-info"
              >
                ثبت
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
