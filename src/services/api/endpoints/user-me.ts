import { API_BASE_URL } from "../api";

export type BodyUserLogin = {
  token: string;
  type: string;
};

export type ResponseUserMe = {
  loggedUserInfo: {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      photo: string;
      isUpdated: boolean;
      emailVerified: boolean;
    };
    address: {
      street: string;
      id: string;
      number: string;
      city: string;
      country: string;
      zipCode: string;
      complement: string;
      state: string;
    };
    identification: {
      nationality: string;
      document: string;
      id: string;
      birthDate: string;
    };
  };
};

export async function getUserMe(body: BodyUserLogin): Promise<any> {
  const { token, type } = body;

  const response = await fetch(`${API_BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(response.statusText);

  return await response.json();
}
