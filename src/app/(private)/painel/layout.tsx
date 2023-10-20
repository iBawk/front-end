"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Cookies from "js-cookie";

export type DataLayoutDashboard = {
  children: ReactNode;
};

export default function LayoutDashboard(data: DataLayoutDashboard) {
  const { children } = data;
  const router = useRouter();

  return (
    <main>
      <Button
        onClick={() => {
          Cookies.remove("auth_token");
          Cookies.remove("token_type");
          router.replace("auth/login");
        }}
      >
        Logout
      </Button>
      {children}
    </main>
  );
}
