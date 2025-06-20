import React, { ReactNode } from "react";
import "./card.css";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return <div className={`cardComponent ${className || ""}`}>{children}</div>;
}
