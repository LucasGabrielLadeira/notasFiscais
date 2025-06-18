import "./navOption.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function NavOption({ icon, text, menuToggled, onClick }) {
  return (
    <div onClick={onClick} className={`menu-option ${menuToggled ? "toggled" : ""}`}>
      <FontAwesomeIcon className="menu-option-icon" icon={icon} />
      <p className="menu-option-text">{text}</p>
    </div>
  );
}
