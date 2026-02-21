import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page-container">
      {/* Background minimalista */}
      <div className="login-background">
        {/* Apenas 2 formas sutis */}
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      {/* Botão voltar */}
      <button 
        className="back-button" 
        onClick={() => navigate('/')}
      >
        ← Voltar
      </button>

      <div className="login-content">
        {/* Lado esquerdo - Branding */}
        <div className="login-branding">
          <div className="branding-inner">
            <div className="logo">
              <span className="logo-text">PRAESO</span>
            </div>
            
            <h1>
              Consciência e<br />
              <span className="highlight-text">controle</span>
            </h1>
            
            <p>
              Acesse sua conta para gerenciar a previsibilidade da sua agenda e 
              garantir compromissos que se cumprem.
            </p>

            {/* Stats simples */}
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">Zero</div>
                <div className="stat-label">Faltas</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Controle</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado direito - Clerk Form */}
        <div className="clerk-form-wrapper">
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/cadastro"
            forceRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;