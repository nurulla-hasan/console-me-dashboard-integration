"use client";
import { useEffect, useState } from "react";

export const useAuthTokens = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(localStorage.getItem("accessToken"));
      setRefreshToken(localStorage.getItem("refreshToken"));
    }
  }, []);

  return { accessToken, refreshToken };
};
