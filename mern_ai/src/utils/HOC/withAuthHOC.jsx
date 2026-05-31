import { useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthContext"


const WithAuthHOC = (WrappedComponent)=>{
    
    return (props)=>{
        const navigate = useNavigate();
        const {setLogin , setUserInfo } = useContext(AuthContext)
        useEffect(()=>{
            const isLogin = localStorage.getItem('isLogin');
            const user = localStorage.getItem("userInfo");

             if (isLogin !== "true") {
                setLogin(false);
                navigate("/");
            } else {
                setLogin(true);

                if (user) {
                    setUserInfo(JSON.parse(user));
                }
            }
        }, [navigate, setLogin, setUserInfo]);

        return <WrappedComponent {...props} />;
    };
};

export default WithAuthHOC;