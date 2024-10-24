import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

export type isValidProps = {
    isTokenValid: boolean;
    refreshToken: string | null;
  }

export const getTokensFromCookies = () => {
    return {
      accessToken: Cookies.get("accessToken"),
      refreshToken: Cookies.get("refreshToken"),
    };
};

export const validateAccessTokenLife = async() => {
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

export const validateRefreshTokenLife = async():Promise<isValidProps> => {
    let isValid = <isValidProps>{};
    if (typeof window !== "undefined") {
        
        const { refreshToken} = getTokensFromCookies();
  
        if (refreshToken) {
            const decoded: { exp: number } = jwtDecode(refreshToken);
  
            const currentTime = Math.floor(Date.now() / 1000);
  
            // Check if the token is expired
            if (currentTime >= decoded.exp) {
                isValid = {...isValid, isTokenValid: false}
            } else {
                isValid = {...isValid, isTokenValid: true, refreshToken: refreshToken}
            }
           
        } else {
            isValid = {...isValid, isTokenValid: false}
        }
    } else {
        isValid = {...isValid, isTokenValid: false}
    }

    return isValid
}