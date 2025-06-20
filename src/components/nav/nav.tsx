"use client";
import "./nav.css";
import React from "react";
import NavOption from "../navOption/navOption";
import {
  faFileInvoiceDollar,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
type NavProps = {
  menuToggled: boolean;
  className?: String;
};

export default function Nav({ menuToggled, className = "" }: NavProps) {
  const router = useRouter();

  const rotas = [
    {
      Title: "Notas de Vendas",
      Icon: faFileInvoiceDollar,
      Route: "/notas/vendas/",
    },
    {
      Title: "Notas de Serviços",
      Icon: faFileContract,
      Route: "/notas/servicos/",
    },
  ];

  return (
    <aside className={`menu-area ${menuToggled ? "toggled-menu" : ""}`}>
      <nav className={`menu-nav ${className}`}>
        <>
          {rotas.map((rota, index) => {
            return (
              <NavOption
                key={index}
                menuToggled={menuToggled}
                icon={rota.Icon}
                text={rota.Title}
                onClick={() => router.push(rota.Route)}
              />
            );
          })}
        </>
      </nav>
    </aside>
  );
}
