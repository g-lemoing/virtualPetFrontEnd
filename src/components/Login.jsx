import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        userName: username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 font-medium">Usuario</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label className="block text-gray-600 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-black p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
          <div className="text-center p-3">
            <a className="text-gray-600 font-medium " href="/register">¿No tienes cuenta todavía?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
