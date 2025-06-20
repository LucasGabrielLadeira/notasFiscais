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
export default function NotasDevolucao() {
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
        <div className="container-tabela">
          <table className="tabela">
            <thead>
              <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th>Data de Cadastro</th>
                <th>Data Referência</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Cliente 1</td>
                <td>Data de Cadastro 1</td>
                <td>Data Referência 1</td>
                <td>Status 1</td>
                <td>Valor 1</td>
                <td></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Cliente 1</td>
                <td>Data de Cadastro 1</td>
                <td>Data Referência 1</td>
                <td>Status 1</td>
                <td>Valor 1</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="footer-tabela">
            <div className="displaying">Exibindo 1 a 10 de 100 registros</div>
            <div className="pagination">
              <button className="pagination-back">
                <FontAwesomeIcon icon={faChevronLeft}/>
              </button>
              <button>
                <span>1</span>
              </button>
              <button className="selected">
                <span>2</span>
              </button>
              <button>
                <span>3</span>
              </button>
              <button className="pagination-next">
                <FontAwesomeIcon icon={faChevronRight}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
