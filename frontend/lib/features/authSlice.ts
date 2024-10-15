import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: { email: string; name: string; phone: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
      
      // Save tokens to localStorage
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (otpData: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/verify-otp/', otpData);

      // Save tokens to localStorage
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', credentials);

      // Save tokens to localStorage
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) throw new Error("No refresh token available");

      // Send the refresh token to the backend for blacklisting
      const response = await axios.post('http://localhost:8000/api/auth/logout/', {
        refresh_token: refreshToken,
      });

      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
});

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    restoreAuthState: (state) => {
      state.accessToken = localStorage.getItem('accessToken');
      state.refreshToken = localStorage.getItem('refreshToken');
      state.isAuthenticated = !!state.accessToken;
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
    builder.addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload?.detail || 'Registration failed';
    });

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
      state.error = action.payload?.detail || 'OTP verification failed';
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
      state.error = action.payload?.detail || 'Login failed';
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
    builder.addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload?.detail || 'Logout failed';
    });
  },
});

export const { resetError, restoreAuthState } = authSlice.actions;
export default authSlice.reducer;
