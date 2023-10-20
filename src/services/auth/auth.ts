"use client";

import Api from "../api/api";

export function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    return true; // Em caso de erro, considere o token como expirado
  }
}

export function setUserLoginTokens(
  accessToken: string,
  tokenType: string,
  refreshToken: string
) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("token_type", tokenType);
  localStorage.setItem("refresh_token", refreshToken);
}

export function setUserLoginAcessToken(accessToken: string) {
  localStorage.setItem("access_token", accessToken);
}

export function getUserLoginRefreshToken(): string {
  const token = localStorage.getItem("refresh_token");

  if (token === null) throw new Error("Refresh token não encontrado");

  if (isTokenExpired(token)) throw new Error("Refresh token expirado");

  return token;
}

export async function getUserLoginAccessToken(): Promise<string> {
  const token = localStorage.getItem("access_token");

  if (token === null) throw new Error("Access token não encontrado");

  if (isTokenExpired(token)) {
    const refresh_token = getUserLoginRefreshToken();

    const newToken = await Api.private.getNewAccessToken(refresh_token);

    setUserLoginAcessToken(newToken);

    return newToken;
  }

  return token;
}

export const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("refresh_token");
};

const auth = {
  setUserLoginTokens,
  getUserLoginAccessToken,
  getUserLoginRefreshToken,
};

export default auth;
