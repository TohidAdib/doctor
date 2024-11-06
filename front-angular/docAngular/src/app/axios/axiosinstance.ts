import axios from "axios";

const axiosInstance:any = axios.create({
  baseURL: "http://127.0.0.1:8080/",
});

axiosInstance.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }else{
      config.headers.Authorization = `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMjUwMjA5LCJpYXQiOjE3MzA4MTgyMDksImp0aSI6IjIwYTU4NTBlMDM1NTQwNmNhZGI2ODEwMDUyNmEyYjY3IiwidXNlcl9pZCI6MX0.ELR5Dh-0GyPn_fukLRmqtSmB0zp7e2o0lnOxXWxnCp8`
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;