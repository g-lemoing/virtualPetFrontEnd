import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import LevelItem from "./LevelItem";
import { useCallback } from "react";
import config from "../config";

const PetCard = ({ pet, fetchPets }) => {
  const navigate = useNavigate();
  const imagePath = `/src/assets/${pet.animal}_${pet.petColor}.png`;

  const handleDeletePet = useCallback(
    async (pet) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "Tu sesión ha caducado, por favor vuelve a introducir tus credenciales."
        );
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/pet/delete/${pet.petUserId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status != 204)
          throw new Error("Error en la eliminación de la mascota");

        fetchPets();
      } catch (error) {
        console.error("Error al actualizar la mascota:", error);
      }
    },
    [navigate, fetchPets]
  );

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-lg w-60 relative cursor-pointer"
      onClick={() => navigate(`/pet/${pet.petUserId}`, { state: { pet } })}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{pet.petName}</h3>
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDeletePet(pet);
          }}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="w-full h-40 bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {" "}
        {/* Use overflow-hidden to prevent image from overflowing */}
        <img
          src={imagePath}
          alt={`Imagen de ${pet.petName}`}
          className="w-40 h-full object-cover rounded-lg" // Make image cover the container
          onError={(e) => (e.target.src = "/src/assets/placeholder.png")} // Placeholder on error
        />
      </div>
      <div className="space-y-2">
        <LevelItem label="Energía" value={pet.petEnergyLevel} type="energy" />
        <LevelItem label="Hambre" value={pet.petHungryLevel} type="hunger" />
        <LevelItem label="Felicidad" value={pet.petMood} type="mood" />
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    petUserId: PropTypes.number.isRequired,
    petName: PropTypes.string.isRequired,
    petEnergyLevel: PropTypes.number.isRequired,
    petHungryLevel: PropTypes.number.isRequired,
    petMood: PropTypes.number.isRequired,
    animal: PropTypes.string, // Add animal and color to PropTypes
    petColor: PropTypes.string,
  }).isRequired,
  fetchPets: PropTypes.func.isRequired,
};

export default PetCard;
