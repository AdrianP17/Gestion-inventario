import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";


export const metadata: Metadata = {
  title: "Sistema de Gestión de Inventario",
  description: "Proyecto de Base de Datos 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <main className="flex p-4 gap-6 min-h-screen">
        <Sidebar />
        <div className=" w-full">
        {children}
        </div>
        </main>
      </body>
    </html>
  );
}
