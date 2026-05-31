import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const login = localStorage.getItem('isLogin');
    const userInfoData = localStorage.getItem("userInfo");

    const [isLogin, setLogin] = useState(login === "true");
    const [userInfo, setUserInfo] = useState(
        userInfoData ? JSON.parse(userInfoData) : null
    );

    useEffect(() => {
        const login = localStorage.getItem("isLogin");
        const user = localStorage.getItem("userInfo");

        if (login === "true" && user) {
            setLogin(true);
            setUserInfo(JSON.parse(user));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, setLogin, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;