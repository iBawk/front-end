import { API_BASE_URL } from "../api";

type ResponseUserLogin = {
  access_token: string;
  token_type: string;
  refresh_token: string;
};

export async function getNewAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}/user/refresh-token?refresh_token=${refreshToken}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error(response.statusText);

  const { access_token } = (await response.json()) as ResponseUserLogin;

  return access_token;
}
