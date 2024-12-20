import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PublicPage() {

  const navigate = useNavigate();


  function goLogin() {
    navigate('/');
  }

  return (
    <div>
      <h1>Bienvenido a la pagina de congresos</h1>
      <button onClick={goLogin} className='btn btn-dark'>Iniciar Sesion</button>
    </div>
  )
}
