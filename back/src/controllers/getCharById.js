const axios = require("axios");
const { Character } = require("../db/index");

const getCharById = async (id) => {
  const char = await Character.findByPk(id);
  if (char) {
    return char;
  }
  const results = await axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
  const newChar = {
    id: results.id,
    name: results.name,
    image: results.image,
    gender: results.gender,
    species: results.species,
    status: results.status,
    origin: results.origin?.name,
    location: results.location?.name,
  };
  Character.create({ ...newChar });
  return newChar;
};

module.exports = getCharById;
