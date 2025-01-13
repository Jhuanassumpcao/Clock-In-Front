import React, { useState } from "react";
import RegisterService from "../../services/RegisterService";
import "./registerForm.css";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await RegisterService.register({ name, email, password });
      setSuccessMessage("Registro bem-sucedido! Você pode fazer login agora.");
      setTimeout(() => navigate("/login"), 500);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("O registro falhou. Por favor, tente novamente.");
      setSuccessMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    handleRegister();
  };

  return (
    <div className="register-container">
      <h1 className="title">
        Ponto <span className="brand">Ilumeo</span>
      </h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          onClick={() => navigate("/login")}
        >
          Voltar
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

export default RegisterForm;
