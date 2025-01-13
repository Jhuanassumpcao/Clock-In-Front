import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import TimeEntryService from "../../services/TimeEntryService";
import Button from "../button/Button";
import { TimeEntry } from "../../interfaces/TimeEntry";
import "./History.css";

const History: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await TimeEntryService.getHistory();
        setEntries(data);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    };
    fetchHistory();
  }, [user.id]);

  const formatTotalHours = (hours: number) => {
    const totalMinutes = Math.round(hours * 60);
    const formattedHours = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;
    return `${formattedHours}h ${formattedMinutes}m`;
  };

  const uniqueDaysWorked = new Set(
    entries.map((entry) => new Date(entry.startTime).toLocaleDateString("pt-BR"))
  ).size;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="history-container">
      <header className="history-header">
        <div className="horizontal-info">
          <div className="left-info">
            <p className="info-label">Relógio de ponto</p>
          </div>
          <div className="right-info">
            <p className="user-name">{user.name || "Usuário não identificado"}</p>
            <p className="label">Usuário</p>
          </div>
        </div>
      </header>

      <main className="history-main">
        <div className="entry-header">
          <p className="days-worked">Dias trabalhados: {uniqueDaysWorked}</p>
        </div>
        <div className="entry-list">
          {currentEntries.length > 0 ? (
            currentEntries.map((entry) => (
              <div key={entry.id} className="entry">
                <span>{new Date(entry.startTime).toLocaleDateString("pt-BR")}</span>
                <span>{formatTotalHours(entry.totalHours)}</span>
              </div>
            ))
          ) : (
            <p>Nenhum registro encontrado.</p>
          )}
        </div>
        <div className="pagination">
          <span
            className={`arrow ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            ←
          </span>
          <span className="page-indicator">
            Página {currentPage} de {totalPages}
          </span>
          <span
            className={`arrow ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNextPage}
          >
            →
          </span>
        </div>
      </main>

      <footer className="history-footer">
        <Button variant="secondary" onClick={() => navigate("/home")}>
          Voltar
        </Button>
      </footer>
    </div>
  );
};

export default History;
