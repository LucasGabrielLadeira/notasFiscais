"use client";
import "./Nav.css";
import React from "react";
import NavOption from "../navOption/navOption";
import {
  faFileCirclePlus,
  faHourglassHalf,
  faCircleCheck,
  faFileLines,
  faUsers,
  faUserGroup,
  faChartLine,
  faIdBadge,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
type NavProps = {
  menuToggled: boolean;
  className?: String;
};

export default function Nav({ menuToggled, className = "" }: NavProps) {
  const router = useRouter();

  return (
    <aside className={`menu-area ${menuToggled ? "toggled-menu" : ""}`}>
      <nav className={`menu-nav ${className}`}>
        <NavOption
          menuToggled={menuToggled}
          icon={faFileCirclePlus}
          onClick={() => router.push("/nova_requisicao")}
          text="Nova Solicitação de Contratação"
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faHourglassHalf}
          text="Processos de Contratação em Andamento"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faCircleCheck}
          text="Processos de Contratação Finalizados"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faFileLines}
          text="Relatório Geral de Solicitações"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faUsers}
          text="Dashboard de Funcionários"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faChartLine}
          text="Evolução Mensal - Quadro de Funcionários"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faIdBadge}
          text="Fichas de Inscrição em Processo Seletivo"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faUserGroup}
          text="Painel de Funcionários"
          onClick={() => null}
        />
        <NavOption
          menuToggled={menuToggled}
          icon={faScrewdriverWrench}
          text="Relatório de Técnicos"
          onClick={() => null}
        />
      </nav>
    </aside>
  );
}
