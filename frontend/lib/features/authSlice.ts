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
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: { email: string; name: string; phone: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
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
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
      // Get the refresh token from localStorage or the Redux state
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) throw new Error("No refresh token available");
  
      // Send the refresh token to the backend for blacklisting
      const response = await axios.post('http://localhost:8000/api/auth/logout/', {
        refresh_token: refreshToken,
      });
  
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
  },
  extraReducers: (builder) => {
    // Handle user registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
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
    });
    builder.addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload?.detail || 'Logout failed';
    });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
