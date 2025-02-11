import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pet, onDelete }) => {
  const navigate = useNavigate();
  const imagePath = `/src/assets/${pet.animal}_${pet.petColor}.png`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-60 relative cursor-pointer"
    onClick={() => navigate(`/pet/${pet.petUserId}`, { state: { pet } })}>

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{pet.petName}</h3>
        <button onClick={(event) => {
          event.stopPropagation
          onDelete(pet.petUserId)
        }} 
          className="text-red-500 hover:text-red-700">
          <Trash2 size={20} />
        </button>
      </div>
      <div className="w-full h-40 bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden"> {/* Use overflow-hidden to prevent image from overflowing */}
        <img 
          src={imagePath} 
          alt={`Imagen de ${pet.petName}`} 
          className="w-40 h-full object-cover rounded-lg" // Make image cover the container
          onError={(e) => e.target.src="/src/assets/placeholder.png" } // Placeholder on error
        />
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium">Energía</span>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${pet.petEnergyLevel * 100}%` }}></div>
          </div>
        </div>
        <div>
          <span className="text-sm font-medium">Hambre</span>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${pet.petHungryLevel * 100}%` }}></div>
          </div>
        </div>
        <div>
          <span className="text-sm font-medium">Felicidad</span>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${pet.petMood * 100}%` }}></div>
          </div>
        </div>
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
    onDelete: PropTypes.func.isRequired,
  };

export default PetCard;
