import React, { useState } from "react";
import AuthService from "../../services/AuthService";
import AuthRepository from "../../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";
import Button from "../button/index";
import "./LoginForm.css";
import { useUser } from "../../contexts/UserContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await AuthService.login({ email, password });
      setUser(response.name, response.token, response.id);
      AuthRepository.saveToken(response.token);
      setSuccessMessage("Login realizado com sucesso!");
      setTimeout(() => navigate("/home"), 500);
    } catch (err) {
      console.error(err);
      setError("Falha no login. Por favor, verifique seu email e senha.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">
        Ponto <span className="brand">Ilumeo</span>
      </h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="button-group">
        <Button
          variant="secondary"
          size="large"
          onClick={() => navigate("/register")}
        >
          Registrar
        </Button>
        <Button
          variant="primary"
          size="large"
          type="submit"
        >
          Confirmar
        </Button>

        </div>
      </form>
    </div>
  );
};

export default LoginForm;
