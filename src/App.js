import './styles/App.css';
import './styles/Login.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Topics from './pages/Topics';
import PublicPage from './pages/PublicPage';
import Profile from './pages/Profile';
import Navigatebar from './components/Navigatebar'
import { AuthProvider, AuthContext } from './AuthContext';
import React, {useContext } from 'react'

const PrivateRoute = ({children})=>{
  const { authToken } = useContext(AuthContext);

  return authToken ? children : <Navigate to="/" />;
}

function App() {
  const location = useLocation();
  // Define rutas donde no quieres mostrar el navbar
  const excludedRoutes = ['/', '/public'];
 
  return (
      <div className="App">
        {/* Renderiza la Navbar solo si la ruta actual no está en la lista de exclusiones */}
        {!excludedRoutes.includes(location.pathname) && <Navigatebar />}
        <Routes>
          {/*Publicas*/}
          <Route path="/" element={<Login />} />
          <Route path="/public" element={<PublicPage />} />
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
