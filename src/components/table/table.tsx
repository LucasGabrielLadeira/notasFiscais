"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import { useState } from "react";
interface TableProps<T extends object> {
  data: T[];
}
export default function Table<T extends object>({ data }: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = data.length / itemsPerPage;
  if (!data || data.length === 0) return <div>Sem dados</div>;
  return (
    <div className="container-tabela">
      <table className="tabela">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((column, colIndex) => (
                  <td key={colIndex}>{column}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="footer-tabela">
        <div className="displaying">
          Exibindo 1 a{" "}
          <select
            name="display-select"
            id="display-select"
            className="display-select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          de {data.length} registros
        </div>
        <div className="pagination">
          {currentPage > 1 ? (
            <>
              <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                className="pagination-back"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                <span>{currentPage - 1}</span>
              </button>
            </>
          ) : (
            <button disabled className="pagination-back disabled">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <button className="selected">
            <span>{currentPage}</span>
          </button>

          {currentPage < totalPages ? (
            <>
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                <span>{currentPage + 1}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                className="pagination-back"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          ) : (
            <button disabled className="pagination-back disabled">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
