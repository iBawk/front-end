import "./globals.css";
import "react-quill/dist/quill.snow.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/lib/antd/antdRegistry";

export const metadata: Metadata = {
  title: "Bawk",
  description: "Descrição",
  viewport: {
    initialScale: 1,
    width: "device-width",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
