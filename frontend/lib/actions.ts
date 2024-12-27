import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
import { websocketEventEmitter } from "@/app/utils/websocketUtils";

export type isValidProps = {
    isTokenValid: boolean;
    refreshToken: string | null;
}

  export type isTokenValidProps = {
    accessToken: string|null;
    refreshToken: string|null;
  }

export const getTokensFromCookies = async() => {
    return {
      accessToken: Cookies.get("accessToken"),
      refreshToken: Cookies.get("refreshToken"),
    };
};

export const validateAccessTokenLife = async(accessToken: string|null) => {
    let isValid;
    if (typeof window !== "undefined") {
        
        // const { accessToken } = getTokensFromCookies();
  
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

export const validateRefreshTokenLife = async() => {
    let isValid = <isValidProps>{};
    if (typeof window !== "undefined") {
        
        const { refreshToken} = await getTokensFromCookies();
  
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


export const tokenValidationToLogout = async() => {
    let isValid = <isTokenValidProps>{};
    if (typeof window !== "undefined") {
        
        const { accessToken, refreshToken } = await getTokensFromCookies();
  
        if (accessToken) {
            const decoded: { exp: number } = jwtDecode(accessToken);
  
            const currentTime = Math.floor(Date.now() / 1000);
  
            // Check if the token is expired
            if (currentTime >= decoded.exp) {
                isValid = isValid
            } else {
                if(accessToken && refreshToken) {
                    isValid = {...isValid, accessToken: accessToken, refreshToken: refreshToken}
                } else {
                    isValid = {...isValid, accessToken: null, refreshToken: null}
                }
                
            }
           
        } else {
            isValid = isValid
        }
    } else {
        isValid = isValid
    }

    return isValid
}

websocketEventEmitter.on("message", ({ connectionKey, data }) => {
    console.log(`Message received on connection ${connectionKey}:`, data);
  
    // Dispatch the data to the Redux store
    // store.dispatch(addWebSocketMessage({ connectionKey, data }));
  });