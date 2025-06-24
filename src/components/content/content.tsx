import React from "react";
import "./content.css";

export default function Content({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={props.style} className="main-container">
      {children}
    </div>
  );
}
