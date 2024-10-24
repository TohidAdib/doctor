import { useState } from "react";
import axiosInstance from "../../axios/axios";
const LogIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [sending, setSendeing] = useState(false);
  const [errors, setErrors] = useState("");
  const handelChange = (e) => {
    const input = e.currentTarget;
    const newUser = { ...user };
    newUser[input.name] = input.value;
    setUser(newUser);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setSendeing(true);
      const response = await axiosInstance.post("login/", user);
      const token = await axiosInstance.post("api/token/", user);
      localStorage.setItem("token", token.data.access);
      console.log(response);
      setSendeing(false);
      window.location = "/";
    } catch (error) {
      setErrors("نام کاربری موجود نمی باشد یا رمز نادرست است");
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
          <label className="mb-4" htmlFor="username">
            شماره تلفن
          </label>
          <input
            id="username"
            className="form-control w-50"
            type="tel"
            value={user.username}
            name="username"
            onChange={handelChange}
          />
        </div>
        <div className="m-3">
          <label className="mb-4" htmlFor="password">
            رمز
          </label>
          <input
            id="password"
            className="form-control w-50"
            type="password"
            value={user.password}
            name="password"
            onChange={handelChange}
          />
        </div>
        <div className="w-50 text-center">
          <button disabled={sending} className="btn btn-lg btn-info">
            {sending ? "در حال ارسال..." : "ارسال"}
          </button>
        </div>
      </form>
      {errors && <div className="alert alert-danger my-2">{errors}</div>}
    </>
  );
};

export default LogIn;
