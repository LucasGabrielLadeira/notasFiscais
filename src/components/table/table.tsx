import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./table.css";
interface TableProps<T extends object> {
  data: T[];
}
export default function Table<T extends object>({ data }: TableProps<T>) {
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
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
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          de 100 registros
        </div>
        <div className="pagination">
          <button className="pagination-back">
            <FontAwesomeIcon icon={faChevronLeft} />
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
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
