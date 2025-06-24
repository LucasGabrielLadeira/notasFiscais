import React from "react";
import "./page.css";
import Card from "@/components/card/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileExport,
  faFileImport,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Table from "@/components/table/table";
export default function NotasDevolucao() {
  const rows = [
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 1,
      cliente: "Informatica LTDA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Pendente",
      valor: 2020.04,
      actions: "",
    },
    {
      numero: 2,
      cliente: "Limpeza Material CIA",
      data_cadastro: "2025-05-12",
      data_referencia: "2025-06-01",
      status: "Fechado",
      valor: 2020.04,
      actions: "",
    }
  ];
  return (
    <Card className="container-vendas">
      <div className="header-vendas">
        <span className="title-vendas">Notas de Vendas</span>
        <div className="buttons-container-vendas">
          <button>
            <FontAwesomeIcon icon={faPlus} />
            <span>Adicionar</span>
          </button>
          <button>
            <FontAwesomeIcon icon={faFileExport} />
            <span>Exportar</span>
          </button>
          <button>
            <FontAwesomeIcon icon={faFileImport} />
            <span>Importar Planilha</span>
          </button>
        </div>
      </div>
      <div>
        <Table data={rows} />
      </div>
    </Card>
  );
}
