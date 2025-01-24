import './styles/App.css';
import './styles/Login.css';
import './styles/Topics.css';
import './styles/Perfil.css'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Topics from './pages/Topics';
import Congress from './pages/Congress';
import Profile from './pages/Profile';
import Navigatebar from './components/Navigatebar'
import { AuthProvider, AuthContext } from './context/AuthContext';
import React, {useContext } from 'react'

const PrivateRoute = ({children})=>{
  const { authToken } = useContext(AuthContext);

  return authToken ? children : <Navigate to="/" />;
}

function App() {
  const location = useLocation();
  // Define rutas donde no quieres mostrar el navbar
  const excludedRoutes = ['/'];
 
  return (
      <div className="App">
        {/* Renderiza la Navbar solo si la ruta actual no está en la lista de exclusiones */}
        {!excludedRoutes.includes(location.pathname) && <Navigatebar />}
        <Routes>
          {/*Publicas*/}
          <Route path="/" element={<Login />} />
          <Route path="/congress" element={<Congress />} />
          {/*Privadas*/}
          <Route path="/topics" element={<PrivateRoute> <Topics /> </PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
        </Routes>
      </div>
  );
}

export default function MainApp() {
  return (
    <AuthProvider>
    <Router>
      <App />
    </Router>
    </AuthProvider>
  );
}
