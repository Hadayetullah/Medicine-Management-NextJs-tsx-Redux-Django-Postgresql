import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"

import { getTokensFromCookies } from "@/actions";

// Define the initial state of the authentication slice
interface AuthState {
  user: {
    email: string | null;
    name: string | null;
    phone: string | null;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

// Helper function to retrieve tokens from Cookies


// Helper function to save tokens to Cookies
const saveTokensToCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, { secure: true, sameSite: "strict", path: "/" });
  Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "strict", path: "/" });
};

// Helper function to remove tokens from Cookies
const removeTokensFromCookies = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    formData: { email: string; name: string; phone: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register/",
        formData
      );

      // Save tokens to Cookies
      const { access, refresh } = response.data.token;
      saveTokensToCookies(access, refresh);

      return { ...response.data, user: formData }; // Include user data in response
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/verify-otp/",
        otpData
      );

      // Save tokens to Cookies
      const { access, refresh } = response.data.token;
      saveTokensToCookies(access, refresh);

      return { ...response.data, user: { email: otpData.email } }; // Include user email
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        credentials
      );

      // Save tokens to Cookies
      const { access, refresh } = response.data.token;
      saveTokensToCookies(access, refresh);

      return { ...response.data, user: { email: credentials.email } }; // Include user email
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { refreshToken } = getTokensFromCookies();

      if (!refreshToken) throw new Error("No refresh token available");

      // Send the refresh token to the backend for blacklisting
      await axios.post(
        "http://localhost:8000/api/auth/logout/",
        {
          refresh_token: refreshToken,
        }
      );

      // Clear tokens from Cookies
      removeTokensFromCookies();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for token refresh
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const { refreshToken } = getTokensFromCookies();
      if (!refreshToken) throw new Error("No refresh token available");

      // Make the request to refresh the token
      const response = await axios.post(
        "http://localhost:8000/api/auth/refresh/",
        { refresh_token: refreshToken }
      );

      // Update tokens in Cookies
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      saveTokensToCookies(accessToken, newRefreshToken);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    validateAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    restoreAuthState: (state) => {
      const { accessToken, refreshToken } = getTokensFromCookies();
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!accessToken;
    },
  },
  extraReducers: (builder) => {
    // Handle user registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.accessToken || null;
      state.refreshToken = action.payload?.refreshToken || null;
    });
    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.detail || "Registration failed";
      }
    );

    // Handle OTP verification
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.accessToken || null;
      state.refreshToken = action.payload?.refreshToken || null;
    });
    builder.addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload?.detail || "OTP verification failed";
    });

    // Handle user login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.accessToken || null;
      state.refreshToken = action.payload?.refreshToken || null;
    });
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload?.detail || "Login failed";
    });

    // Handle user logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(
      logoutUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.detail || "Logout failed";
      }
    );
  },
});

export const { setLoading, resetError, restoreAuthState, validateAuthentication } = authSlice.actions;
export default authSlice.reducer;