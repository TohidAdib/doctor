import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";
const Visit = () => {
    const navigate = useNavigate()
  const [user, setUser] = useState({
    user: "",
    name: "",
    national_id: "",
    father_name: "",
    description: "",
    email: "",
    visit_date: null,
    visit_time: null,
  });
  const [sending, setSendeing] = useState(false);
  const [errors, setErrors] = useState("");
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("user/");
        setUser((prevUser) => ({
          ...prevUser,
          user: response.data.id
        }));
        setUserId(response.data.id);
      } catch (error) {
        setErrors("مشکلی پیش آمده لطفا مجددا امتحان کنید");
      }
    };
    fetchData();
  }, []);
  
  const hadnelChange = (e) => {
    const input = e.currentTarget;
    const newUser = { ...user };
    newUser[input.name] = input.value;
    setUser(newUser);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setSendeing(true);
      const response = await axiosInstance.post("patient/", user);
      console.log(response);
      setSendeing(false);
      navigate("/")
    } catch (error) {
      setErrors("مشکلی پیش امده لطفا مجددا امتحان کنید");
      console.log(error);
      setSendeing(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handelSubmit}
        className="container"
      >
        <div className="m-3">
          <label className="mb-4" htmlFor="name">
            نام بیمار:
          </label>
          <input
            required
            id="name"
            className="form-control"
            type="text"
            value={user.name}
            name="name"
            onChange={hadnelChange}
          />
        </div>
        <div className="m-3">
          <label className="mb-4" htmlFor="national_id">
            کدملی
          </label>
          <input
            required
            id="national_id"
            className="form-control"
            type="national_id"
            value={user.national_id}
            name="national_id"
            onChange={hadnelChange}
          />
        </div>
        <div className="m-3">
          <label className="mb-4" htmlFor="father_name">
            نام پدر بیمار
          </label>
          <input
            required
            id="father_name"
            className="form-control"
            type="father_name"
            value={user.father_name}
            name="father_name"
            onChange={hadnelChange}
          />
        </div>
        <div className="m-3">
          <label className="mb-4" htmlFor="description">
            توضیحات
          </label>
          <input
            placeholder="اختیاری"
            id="description"
            className="form-control"
            type="description"
            value={user.description}
            name="description"
            onChange={hadnelChange}
          />
        </div>
        <div className="m-3">
          <label className="mb-4" htmlFor="email">
            ایمیل
          </label>
          <input
            placeholder="اختیاری"
            id="email"
            className="form-control"
            type="email"
            value={user.email}
            name="email"
            onChange={hadnelChange}
          />
        </div>
        <div className="text-center">
          <button disabled={sending} className="btn btn-lg btn-info">
            {sending ? "در حال ارسال..." : "ارسال"}
          </button>
        </div>
      </form>
      {errors && <div className="alert alert-danger my-2">{errors}</div>}
    </>
  );
};

export default Visit;
