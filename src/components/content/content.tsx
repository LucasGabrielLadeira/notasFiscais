import React from "react";
import "./content.css";

export default function Content({ children }: { children: React.ReactNode }) {
  return <div className="main-container">{children}</div>;
}
