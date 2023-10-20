import { API_BASE_URL } from "../api";

enum CodeResponse {
  OK = 200,
  VALIDATION_ERRO = 422,
  ERROR = 400,
}

type Body = {
  name: string;
  email: string;
  password: string;
};

export async function postUserRegister(body: Body): Promise<CodeResponse> {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  console.log(response)
  if (!response.ok) throw new Error(response.statusText);

  return CodeResponse.OK;
}
