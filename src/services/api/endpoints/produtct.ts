import { API_BASE_URL } from "../api";

export type ResponseGetProduct = {
  name: string;
  format: string;
  markdown: string;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
  category: string;
  id: string;
  owner_id: string;
  description: string;
  status: number;
  created_at: string;
};

export async function getProduct(
  accessToken: string,
  id: string
): Promise<ResponseGetProduct> {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) throw new Error("Error em Get Products");

  const rawData = await response.json();

  return rawData as ResponseGetProduct;
}

export async function getProducts(
  accessToken: string
): Promise<Array<ResponseGetProduct>> {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) throw new Error("Error em Get Products");

  const rawData = await response.json();

  return rawData as Array<ResponseGetProduct>;
}

export enum ResponsePostProduct {
  OK = 200,
  ERROR = 400,
}

export type BodyPostProduct = {
  name: string;
  description: string;
  format: string;
  category: string;
  markdown: string;
  status: number;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
};

export async function postProduct(
  accessToken: string,
  body: BodyPostProduct
): Promise<ResponsePostProduct> {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  if (!response.ok) throw new Error("Error em Get Products");

  return ResponsePostProduct.OK;
}

export enum ResponseDeleteProduct {
  OK = 200,
  ERROR = 400,
}

export async function deleteProduct(
  accessToken: string,
  id: string
): Promise<ResponseDeleteProduct> {
  const response = await fetch(`${API_BASE_URL}/product?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) throw new Error("Error em Get Products");

  return ResponseDeleteProduct.OK;
}
