const axios = require("axios");
const { Character } = require("../index");


const saveChars = async () => {
  let promesas = [];
  let id = 1;
  while (id !== 11) {
    promesas.push(
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err.message))
    );
    // console.log(id);
    id++
  }
  const results = await Promise.all(promesas).finally(() => {console.log("Done")});
  results.forEach(async (char) => {
    await Character.create({
      id:char.id,
      name: char.name,
      species: char.species,
      status: char.status,
      gender: char.gender,
      image: char.image,
      origin: char.origin?.name,
      location: char.location?.name,
    });
  });
};

  saveChars()