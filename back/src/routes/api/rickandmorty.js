const { Router } = require("express");
const getCharById = require("../../controllers/getCharById");
const getCharDetail = require("../../controllers/getCharDetail");
const allChars = require("./Allchars");
const fav = require("./favs");
const userExtractor = require("../../middleware/userExtractor");

const api = Router();

api.use("/fav", fav);
api.use("/allchars", allChars);

api.get("/character/:id",userExtractor ,async (req, res) => {
  const { id } = req.params;
  try {
    const char = await getCharById(id);
    res.status(200).json(char);
  } catch (error) {
    res.status(404).json(error);
  }
});
api.get("/detail/:id", userExtractor,async (req, res) => {
  const { id } = req.params;
  try {
    const char = await getCharDetail(id);
    res.status(200).json(char);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = api;
