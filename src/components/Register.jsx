import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("http://localhost:8080/auth/signup", {
        userName: username, // Asegúrate de que coincide con el backend
        password,
      });

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login"); // Redirige al login tras el registro exitoso
    } catch (err) {
      setError("Error al registrar. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Usuario</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Registrarse
          </button>
          <div className="p-3 text-center">
            <a className= "text-gray-600 font-medium" href="/login">¡Ya tengo cuenta, gracias!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
