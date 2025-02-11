import PropTypes from "prop-types";

const LevelItem = ({ label, value, color }) => {
  return (
    <div>
      <span className="text-sm font-medium">{label}</span>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value * 100}%` }}></div>
      </div>
    </div>
  );
};

LevelItem.propTypes = {
  label: PropTypes.string.isRequired, // Nombre del nivel ("Energía", "Hambre", etc.)
  value: PropTypes.number.isRequired, // Nivel entre 0 y 1
  color: PropTypes.string.isRequired, // Color de la barra de progreso
};

export default LevelItem;
