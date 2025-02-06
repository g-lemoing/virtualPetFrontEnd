import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PetsList from "./pages/PetsPage";

// Función para comprobar si el usuario está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null; // Devuelve true si hay un token, false si no
};

const App = () => {
  return (
    <Routes>
      {/* Si no hay un token válido, redirige de "/" a "/login" */}
      <Route path="/" element={isAuthenticated() ? <Navigate to="/pets" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<h1>Bienvenido al Dashboard</h1>} />
      <Route path="/pets" element={<PetsList />} />

    </Routes>
  );
};

export default App;

