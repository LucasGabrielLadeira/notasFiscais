import "./logo.css";
import Image from "next/image";
import React from "react";
import LogoImage from "../../assets/images/logoWhiteText.png";
type LogoProps = {
    menuToggled: boolean;
};
export default function Logo({ menuToggled, ...props }: LogoProps) {
  return (
    <div className={`logo ${menuToggled ? "toggled-menu" : ""}`}>
      <Image src={LogoImage} alt="Logo" className="img" />
    </div>
  );
}
