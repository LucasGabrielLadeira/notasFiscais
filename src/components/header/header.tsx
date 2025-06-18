import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "@/contexts/authContext";

type HeaderProps = {
  setMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

export default function Header({ setMenuToggled, className }: HeaderProps) {
  const { user, logout } = useAuth();

  const capitalizeFirst = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getNome = () => {
    if (!user?.nome) return "Usuário";
    const primeiroNome = user.nome.split(" ")[0];
    return capitalizeFirst(primeiroNome);
  };

  const nome = getNome();
  return (
    <header className={`header ${className}`}>
      <FontAwesomeIcon
        icon={faBars}
        className="menu-toggle"
        onClick={() => setMenuToggled((prev) => !prev)}
      />
      <Dropdown className="perfil-dropdown">
        <Dropdown.Toggle variant="success" id="dropdown-toggle">
          <FontAwesomeIcon icon={faUser} />
          {nome ?? "usuário"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className="dropdown-item" onClick={logout}>
            Sair
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}
