import "./logo.css";
import Image from "next/image";
import React from "react";
import LogoImage from "../../assets/images/logo.png";
type LogoProps = {
    menuToggled: boolean;
};
export default function Logo({ menuToggled }: LogoProps) {
  return (
    <div className={`logo ${menuToggled ? "toggled-menu" : ""}`}>
      <Image src={LogoImage} alt="Logo" className="img" />
    </div>
  );
}
