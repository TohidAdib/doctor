import { Outlet, Link } from "react-router-dom";
const LogInSignIn = () => {
  return (
    <div className="container">
      <div className="my-3" style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
        <Link to="login" className="btn btn-primary">
          ورود
        </Link>
        <Link to="signin" className="btn btn-info">
          ثبت نام
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default LogInSignIn;
