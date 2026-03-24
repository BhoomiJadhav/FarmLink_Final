import React from "react";
import "../home.css";
import { FloatingLeaves } from "../components/floating-leaves";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="font-sans antialiased min-h-screen">
      <FloatingLeaves />
      {children}
    </div>
  );
}
