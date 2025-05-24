"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { resetPassword } from "@/lib/api/auth";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  // Submit
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const email = localStorage.getItem("resetEmail");
      const token = localStorage.getItem("passwordResetToken");
      if (!email) {
        toast.error("No email found.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        email,
        password: data.password,
        token
      };

      await resetPassword(payload);

      toast.success("Password reset successfully!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || "Failed to reset password.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 ">
      <div className="border bg-[#FEFEFEE5] p-14 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-[#333333] mb-4">
          Set a New Password
        </h1>
        <p className="text-center text-[#333333] mb-8 text-xs">
          Create a new password. Ensure it differs from previous ones for security
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-xs font-medium text-[#333333] mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border text-[#5C5C5C] text-xs rounded-sm ${errors.password ? "border-red-500" : "border-[#00A89D]"
                  } focus:outline-none cursor-pointer`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
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

          {/* Confirm Password */}
          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-[#333333] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border  text-[#5C5C5C] text-xs rounded-sm ${errors.confirmPassword ? "border-red-500" : "border-[#00A89D]"
                  } focus:outline-none cursor-pointer`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <PiEyeLight className="h-4 w-4 text-[#00A89D]" />
                ) : (
                  <PiEyeSlash className="h-4 w-4 text-[#00A89D]" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00A89D] border disabled:cursor-not-allowed border-gray-400 text-white py-2 text-xs px-4 hover:bg-[#428a85] transition duration-200 cursor-pointer disabled:opacity-70 rounded-sm"
          >
            {isSubmitting ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
