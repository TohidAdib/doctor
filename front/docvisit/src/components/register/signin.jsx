import { useState } from "react";
import axiosInstance from "../../axios/axios";
const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
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
      const response = await axiosInstance.post("signin/", user);
      const token = await axiosInstance.post("api/token/", user);
      localStorage.setItem("token", token.data.access);
      console.log(response);
      setSendeing(false);
      window.location = "/";
    } catch (error) {
      setErrors("پسوردها یکسان نمیباشد");
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
        <div className="m-3">
          <label className="mb-4" htmlFor="password2">
            تایید رمز
          </label>
          <input
            id="password2"
            className="form-control w-50"
            type="password"
            value={user.password2}
            name="password2"
            onChange={handelChange}
          />
        </div>
        <div className="w-50 text-center">
          <button disabled={sending} className="btn btn-lg btn-info">
            {sending ? "درحال ارسال ..." : "ارسال"}
          </button>
        </div>
      </form>
      {errors && <div className="alert alert-danger my-2">{errors}</div>}
    </>
  );
};

export default SignIn;
