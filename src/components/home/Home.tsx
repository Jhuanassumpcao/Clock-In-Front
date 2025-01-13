import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Button from "../button/Button";
import TimeEntryService from "../../services/TimeEntryService";
import TimeEntryRepository from "../../repositories/TimeEntryRepository";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShiftActive, setIsShiftActive] = useState(
    TimeEntryRepository.getShiftState()
  );
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isShiftActive) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isShiftActive]);

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setElapsedTime(0);
    }, 1000);
  };

  const handleShiftToggle = async () => {
    try {
      if (isShiftActive) {
        const endTime = new Date();
        await TimeEntryService.endShift(user.id!, endTime);
        toast.success("Turno encerrado com sucesso!");
        startAnimation();
        console.log("Turno encerrado.");
      } else {
        const startTime = new Date();
        await TimeEntryService.startShift(user.id!, startTime);
        toast.success("Turno iniciado com sucesso!");
        console.log("Iniciando turno...");
      }
      const newShiftState = !isShiftActive;
      setIsShiftActive(newShiftState);
      TimeEntryRepository.saveShiftState(newShiftState);
    } catch (error) {
      toast.error("Erro ao alternar turno.");
      console.error("Erro ao alternar turno:", error);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="info-section">
          <div className="horizontal-info">
            <div className="left-info">
              <p className="info-label">Relógio de ponto</p>
            </div>
            <div className="right-info">
              <p className="user-name">{user.name || "Usuário não identificado"}</p>
              <p className="label">Usuário</p>
            </div>
          </div>
          <div className="horizontal-info">
            <div className="left-info">
              <div
                className={`elapsed-time-container ${
                  isAnimating ? "animate" : ""
                }`}
              >
                <p className="info-value">{formatElapsedTime(elapsedTime)}</p>
                <p className="label">Horas de Hoje</p>
              </div>
            </div>
            <div className="right-info">
              <p className="date">
                {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="home-main">
        <button className="start-shift-button" onClick={handleShiftToggle}>
          {isShiftActive ? "Encerrar Turno" : "Iniciar Turno"}
        </button>
      </main>

      <footer className="home-footer">
        <Button variant="secondary" onClick={() => navigate("/history")}>
          Histórico
        </Button>
      </footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
