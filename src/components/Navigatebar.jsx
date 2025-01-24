import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navigate() {
   
   const navigate = useNavigate();
   
   const Logout = () => {
    // Borrar el token del almacenamiento local
    localStorage.removeItem("authToken");
    // Redirigir al inicio de sesión
    navigate('/');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/public">Pagina Inicio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/topics">Temas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/congress">Congresos</Link>
            </li>
          </ul>
          <span className="navbar-text">
            <button className='btn btn-light' onClick={Logout}><i className="bi bi-box-arrow-left"></i> Cerrar sesion </button>
          </span>
        </div>
      </div>
    </nav>
  )
}
