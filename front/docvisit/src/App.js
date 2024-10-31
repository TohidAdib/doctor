import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./axios/axios";
import Main from "./components/main";
import Visit from "./components/visit";
import Admin from "./components/admin";
import LogOut from "./components/register/logout";
import TakenVisit from "./components/takenvisit";
import TakenVisited from "./components/takenvisted";
import LogInSignIn from "./components/register/loginsignin";
import LogIn from "./components/register/login";
import SignIn from "./components/register/signin";

function App() {
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
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      {token ? (
        <Routes>
          <Route path="visit" element={<Visit />} />
          {userStaff && <Route path="admin" element={<Admin />} />}
          <Route path="logout/" element={<LogOut />} />
          <Route path="takenvisit/" element={<TakenVisit />} />
          <Route path="takenvisited/" element={<TakenVisited />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="rigester/" element={<LogInSignIn />}>
              <Route path="login" element={<LogIn />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
            <Route path="logout/rigester/" element={<LogInSignIn />}>
              <Route path="login" element={<LogIn />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
