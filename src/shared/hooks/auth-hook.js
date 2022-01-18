import  { useState, useCallback, useEffect } from "react";
//let logoutTimer;
export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState();
   // const [tokenExp, setTokenExp] = useState();


    const login = useCallback((uid, token, expDate) => {
        setToken(token);
       // const tokenExpDate = expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        //setTokenExp(tokenExpDate);
        localStorage.setItem('userData', JSON.stringify({
            userId: uid,
            token: token,
            //exp: tokenExpDate.toISOString()
        }))
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    /*useEffect(() => {
        if (token) {
            const remainingTime = tokenExp - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExp])*/

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.token /*&& new Date(userData.exp) > new Date()*/) {
            login(userData.userId, userData.token, /*new Date(userData.exp)*/);
        }
    }, [login]);
    return {token, userId, login, logout};
}