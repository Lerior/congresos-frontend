import React, { useState } from 'react'
import axios from 'axios';

export default function Login() {
  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        user,
        pass,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div className='Login-Backtoback p-3' name="fondo">
        <div className="Login-Background card">
          <div className="Login-Text Login-Header card-header">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <div className="col-md-6"></div>
            <div className="col-md-auto">
              <div className="">
                <h3 className="Login-Text p-2">
                  Usuario:
                </h3>
                <div className="input-group input-group-lg p-3">
                  <input type="text" className="form-control" value={user} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
                </div>
              </div>
              <div className="">
                <h3 className="Login-Text p-2">
                  Contraseña:
                </h3>
                <div className="input-group input-group-lg p-3">
                  <input type="password" className="form-control" value={pass} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
            <div className="p-4">
              <button className="btn btn-dark" type="submit">Iniciar Sesión</button>
            </div>
            <label id="verisonPHP" type="text"></label>
          </div>
        </div>
      </div>
    </form>
  );
}

