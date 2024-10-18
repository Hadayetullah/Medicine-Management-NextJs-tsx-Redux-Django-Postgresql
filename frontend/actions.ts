import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

export const getTokensFromCookies = () => {
    return {
      accessToken: Cookies.get("accessToken"),
      refreshToken: Cookies.get("refreshToken"),
    };
};

export const validateTokenLife = async() => {
    let isValid;
    if (typeof window !== "undefined") {
        
        const { accessToken } = getTokensFromCookies();
  
        if (accessToken) {
            const decoded: { exp: number } = jwtDecode(accessToken);
  
            const currentTime = Math.floor(Date.now() / 1000);
  
            // Check if the token is expired
            if (currentTime >= decoded.exp) {
                isValid = false
            } else {
                isValid = true
            }
           
        } else {
            isValid = false
        }
    } else {
        isValid = false
    }

    return isValid
}