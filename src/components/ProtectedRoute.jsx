import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null; // Aquí podrías agregar validación de expiración si lo necesitas
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
