"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const VerifyEmailForm = () => {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      inputRefs.current[4]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.join("").length !== 6) return;

    setIsSubmitting(true);
    console.log("Verifying code:", code.join(""));

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/auth/reset-password");
    }, 1600);
  };

  const handleResend = () => {
    console.log("Resending verification code");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 text-white">
      <div className="border bg-[#FEFEFEE6] p-14 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-[#333333] mb-4">
          Check Your Email
        </h1>
        <p className="text-center text-[#333333] mb-16 max-w-xs text-xs">
          We sent a code to your email address. Please enter the 6-digit code.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-4 mb-16">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-10 text-center border border-[#00A89D] rounded-xl text-lg text-black font-normal focus:outline-none focus:border-[#00A89D]"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || code.join("").length !== 6}
            className="w-full bg-[#00A89D] border border-gray-400 disabled:cursor-not-allowed text-white py-2 text-xs px-4  hover:bg-[#428a86] transition duration-200 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-16 text-center text-sm text-[#333333]">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-[#00A89D] font-medium hover:underline cursor-pointer"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
