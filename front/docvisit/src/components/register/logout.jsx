import { useEffect } from "react";
const LogOut = () => {
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token){
            localStorage.removeItem("token")
            window.location = "rigester"
        }
    },[])
    return ( <></> );
}
 
export default LogOut;