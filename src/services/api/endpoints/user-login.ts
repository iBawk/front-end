import { API_BASE_URL } from "../api";

type ResponseUserLogin = {
  access_token: string;
  token_type: string;
  refresh_token: string;
};

type BodyUserLogin = {
  email: string;
  password: string;
};

export async function getUserLogin(body: BodyUserLogin): Promise<ResponseUserLogin> {
  const response = await fetch(
    `${API_BASE_URL}/user/login?email=${body.email}&password=${body.password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error(response.statusText);

  return (await response.json()) as ResponseUserLogin;
}
