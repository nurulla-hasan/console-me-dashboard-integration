"use client";
import { Suspense } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi"; 
import { ImSpinner9 } from "react-icons/im";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api/auth";
import { ErrorToast, SuccessToast } from "@/utils/ValidationToast";
import { jwtDecode } from "jwt-decode";
import Loading from "../loading/Loading";

const LoginFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [isLoading, setIsLoading] = useState(false); 

  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true); 
    try {
      const res = await login({ ...data, rememberMe: rememberPassword }); 
      
      const { accessToken, refreshToken, message } = res.data;

      const decode = jwtDecode(accessToken);
      if (decode?.role === "admin") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken); 
        SuccessToast(message);
        router.replace(redirect);
      } else {
        ErrorToast("You are not an admin");
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (!message) {
        ErrorToast("Something Went Wrong");
        return;
      }
      const knownErrors = {
        "User not found": "Couldn't find your email address",
        "Invalid password": "Wrong Password",
        "User is banned": "You Are Banned",
      };

      ErrorToast(knownErrors[message] || "Something Went Wrong");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 text-white">
      <div className="border bg-[#FEFEFE] p-14 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-[#333333] mb-4">Login to Account</h1>
        <p className="text-center text-[#333333] mb-6 text-sm">Please enter your email and password to continue</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <label htmlFor="email" className="block text-xs font-medium text-[#333333] mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border text-[#5C5C5C] text-xs bg-white rounded-sm ${
                errors.email ? "border-red-500" : "border-[#00A89D]"
              } focus:outline-none cursor-pointer`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-xs font-medium text-[#333333] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full px-3 py-2 border text-[#5C5C5C] text-xs bg-white rounded-sm ${
                  errors.password ? "border-red-500" : "border-[#00A89D]"
                } focus:outline-none cursor-pointer`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <PiEyeLight className="h-4 w-4 text-[#00A89D]" />
                ) : (
                  <PiEyeSlash className="h-4 w-4 text-[#00A89D]" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
                className="h-3 w-3 text-[#00A89D] accent-[#079891] cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-[#333333]">
                Remember Password 
              </label>
            </div>
            <Link href="/auth/forgot-password" className="text-xs text-[#333333] hover:underline cursor-pointer">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 text-xs flex justify-center items-center px-4 transition duration-200 cursor-pointer rounded-sm ${
              isLoading ? "bg-[#428a85] cursor-not-allowed" : "bg-[#00A89D] hover:bg-[#428a85]"
            }`}
          >
            {isLoading ? <ImSpinner9 size={16} className="animate-spin"/> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginForm;