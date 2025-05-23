import { api } from "./axiosInstance";

// Login
export const login = (data) => api.post("/auth/login", data);

// Forgot Password
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);

// Verify OTP
export const verifyOtp = (data) => api.post("/auth/verify-otp", data);

// Resend OTP
export const resendOtp = (data) => api.post("/auth/resend", data);

// Reset Password
export const resetPassword = (data) => api.post("/auth/reset-password", data);

// Refresh Token
export const refreshToken = (data) => api.post("/auth/refresh-token", data);

// get profile
export const getUserProfile = (profile_id) => api.get(`/profile?profile_id=${profile_id}`);
