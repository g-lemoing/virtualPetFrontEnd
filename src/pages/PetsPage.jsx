import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://localhost:8080/pet/read", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPets(response.data);
        } catch (err) {
          setError("Error al cargar las mascotas");
        } finally {
          setLoading(false);
        }
      };
    fetchPets();
  }, []);

  const handleDelete = async (petUserId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta mascota?");
    if (!confirmDelete) return;
    
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/pet/delete/${petUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPets(pets.filter(pet => pet.petUserId !== petUserId));
    } catch (err) {
      alert("Error al eliminar la mascota");
    }
  };

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Mis Mascotas</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {pets.map((pet) => (
          <div key={pet.petUserId} className="bg-white p-6 rounded-2xl shadow-lg w-80">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{pet.petName}</h3>
              <button onClick={() => handleDelete(pet.petUserId)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Imagen</span>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Energía</span>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${pet.petEnergyLevel * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Hambre</span>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{ width: `${pet.petHungryLevel * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Felicidad</span>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{ width: `${pet.petMood * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsList;
