import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import config from "../config";
import { PlusCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PetCard from "/src/components/PetCard";
import homeBackground from "../assets/home.png";

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({ petName: "", animal: "DOG", petColor: "RED" });
  const navigate = useNavigate();

  const fetchPets = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${config.API_BASE_URL}/pet/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPets(response.data);

    } catch (err) {
      if(err.status === 403){
        console.error("Token caducado o no autorizado. Redirigiendo al login...")
        localStorage.removeItem("token"); // Elimina el token caducado
        navigate("/login"); // Redirige al login
      }else{
        setError("Error al cargar las mascotas");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreatePet = async () => {
    if (!newPet.petName.trim()) {
      alert("El nombre de la mascota es obligatorio");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.post(`${config.API_BASE_URL}/pet/create`, newPet, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      setShowModal(false);
      fetchPets();
    } catch (err) {
      alert(err.response?.data?.description || "Error al crear la mascota");
    }
  };

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Mis Mascotas</h2>
        <div className="flex gap-4">
          <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
            <PlusCircle size={20} /> Crear Mascota
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {pets.map((pet) => (
          <PetCard key={pet.petUserId} pet={pet} fetchPets={fetchPets} />
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center"
            style={{
              backgroundImage: `url(${homeBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Crear nueva mascota</h3>
            <input type="text" placeholder="Nombre" className="w-full p-2 mb-3 border rounded" value={newPet.petName} onChange={(e) => setNewPet({ ...newPet, petName: e.target.value })} />
            <select className="w-full p-2 mb-3 border rounded" value={newPet.animal} onChange={(e) => setNewPet({ ...newPet, animal: e.target.value })}>
              <option value="MONKEY">Mono</option>
              <option value="KANGAROO">Canguro</option>
              <option value="KOALA">Koala</option>
              <option value="LION">León</option>
            </select>
            <select className="w-full p-2 mb-3 border rounded" value={newPet.petColor} onChange={(e) => setNewPet({ ...newPet, petColor: e.target.value })}>
              <option value="RED">Rojo</option>
              <option value="GREEN">Verde</option>
              <option value="YELLOW">Amarillo</option>
              <option value="BLUE">Azul</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
              <button onClick={handleCreatePet} className="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetsList;
