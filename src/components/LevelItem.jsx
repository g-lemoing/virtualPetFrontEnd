import PropTypes from "prop-types";

const LevelItem = ({ label, value, type }) => {
  // Función para determinar el color según el tipo y el valor
  const getColor = () => {
    if (type === "hunger") {
      if (value >= 0.8) return "bg-red-500"; // Mucha hambre (peligro)
      if (value >= 0.5) return "bg-orange-400"; // Hambre moderada
      return "bg-green-500"; // Bien alimentado
    } else {
      if (value <= 0.3) return "bg-red-500"; // Baja energía o felicidad (peligro)
      if (value <= 0.6) return "bg-orange-400"; // Nivel medio
      return "bg-green-500"; // Alto nivel (óptimo)
    }
  };

  return (
    <div>
      <span className="text-sm font-medium">{label}</span>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`h-2 rounded-full ${getColor()}`}
          style={{ width: `${value * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

LevelItem.propTypes = {
  label: PropTypes.string.isRequired, // Nombre del nivel ("Energía", "Hambre", etc.)
  value: PropTypes.number.isRequired, // Nivel entre 0 y 1
  type: PropTypes.oneOf(["energy", "hunger", "mood"]).isRequired, // Tipo del nivel
};

export default LevelItem;
