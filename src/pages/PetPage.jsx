import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import LevelItem from "/src/components/LevelItem";

const PetPage = () => {
  const location = useLocation();
  const [pet, setPet] = useState(location.state?.pet);
  const navigate = useNavigate();
  const imagePathDef = `/src/assets/${pet.animal}__${pet.petColor}.png`;
  const imageBgDef = `/src/assets/background/${pet.animal}.png`;
  const imageBgBeach = `/src/assets/background/beach.png`;
  const imagePetBeach = `/src/assets/${pet.animal}_beach_${pet.petColor}.png`;
  const imageCocktail = `/src/assets/cocktail.png`;
  const imageSunglassesBeach = `/src/assets/sunglasses_beach_${pet.animal}.png`;
  const imageSunglassesDef = `/src/assets/sunglasses_default_${pet.animal}.png`;
  const imageRead = `/src/assets/read_${pet.animal}.png`;
  const imageFood = `/src/assets/food_${pet.animal}.png`;
  const imageSleep = `/src/assets/sleep_${pet.animal}.png`;
  const imagePlay = `/src/assets/play_${pet.animal}.png`;

  const initialLayers = [
    { id: "backGround", src: imageBgDef, zIndex: 0 },
    { id: "mainImage", src: imagePathDef, zIndex: 10 },
  ];
  const [layers, setLayers] = useState(initialLayers);

  const addLayer = (id, Src) => {
    setLayers((prev) => {
      if (prev.some((layer) => layer.id === id)) {
        return prev;
      }
      return [...prev, { id: id, src: Src, zIndex: 30 }];
    });
  };

  const removeLayer = (id) => {
    setLayers((prev) => prev.filter((layer) => layer.id !== id));
  };

  const resetLayers = () => {
    setLayers([...initialLayers]);
  };

  const updatePetStatus = async (action) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Tu sesión ha caducado, por favor vuelve a hacer login.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/pet/update/${pet.petUserId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error en la actualización");

      const updatedPet = await response.json();
      setPet(updatedPet); // Actualiza los niveles en la interfaz
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
    }
  };

  if (!pet) return <p>Mascota no encontrada</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">{pet.petName}</h3>
        <button
          onClick={() => navigate("/pets")}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Volver a la lista
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="flex gap-6">
        {/* Imagen */}
        <div className="relative w-2/3 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
          {layers.map((layer) => (
            <img
              key={layer.id}
              src={layer.src}
              className="absolute top-0 left-0 w-full h-full"
              style={{ zIndex: layer.zIndex }}
              alt={layer.id}
            />
          ))}
        </div>

        {/* Controles */}
        <div className="w-1/3 flex flex-col space-y-2">
          <button
            onClick={() => {
              resetLayers();
              addLayer("food", imageFood);
              updatePetStatus("FEED");
            }}
            className="p-3 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Comer
          </button>
          <button
            onClick={() => {
              resetLayers();
              addLayer("sleep", imageSleep);
              updatePetStatus("SLEEP");
            }}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Dormir
          </button>
          <button
            onClick={() => {
              resetLayers();
              addLayer("play", imagePlay);
              updatePetStatus("PLAY");
            }}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Jugar
          </button>
          <button
            onClick={() => {
              resetLayers();
              addLayer("read", imageRead);
              updatePetStatus("WORK");
            }}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Leer
          </button>
          <button
            onClick={() => {
              const hasBeach = layers.some((layer) =>
                layer.src.includes("beach")
              );
              layers.some((layer) => layer.id.includes("sunglasses"))
                ? removeLayer("sunglasses")
                : addLayer(
                    "sunglasses",
                    hasBeach ? imageSunglassesBeach : imageSunglassesDef
                  );
              updatePetStatus("SUNGLASSES");
            }}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            Gafas de sol
          </button>
          <button
            onClick={() => {
              resetLayers();
              addLayer("backGround", imageBgBeach);
              addLayer("mainImage", imagePetBeach);
              addLayer("cocktail", imageCocktail);
              updatePetStatus("BEACH");
            }}
            className="p-3 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Playa
          </button>
        </div>
      </div>

      {/* Niveles de la mascota */}
      <div className="mt-6 space-y-2">
        <LevelItem label="Energía" value={pet.petEnergyLevel} type="energy" />
        <LevelItem label="Hambre" value={pet.petHungryLevel} type="hunger" />
        <LevelItem label="Felicidad" value={pet.petMood} type="mood" />
      </div>
    </div>
  );
};

PetPage.propTypes = {
  pet: PropTypes.shape({
    petUserId: PropTypes.number.isRequired,
    petName: PropTypes.string.isRequired,
    animal: PropTypes.string.isRequired,
    petColor: PropTypes.string.isRequired,
    petEnergyLevel: PropTypes.number.isRequired,
    petHungryLevel: PropTypes.number.isRequired,
    petMood: PropTypes.number.isRequired,
  }).isRequired,
};

export default PetPage;
