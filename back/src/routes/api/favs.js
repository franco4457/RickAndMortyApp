const { Router } = require('express')
const { addCharacter } = require('../../controllers/controllerUser')
const { getAllFavs, deleteFav } = require('../../controllers/getAllFav')
const userExtractor = require('../../middleware/userExtractor')

const fav = Router()

fav.get('/', userExtractor, async (req, res) => {
  const { userId } = req
  try {
    const favs = await getAllFavs(userId)
    res.status(200).json(favs)
  } catch (error) {
    res.status(404).json(error)
  }
})

fav.put('/addfav/:characterId', userExtractor, async (req, res) => {
  const { characterId } = req.params
  const { userId } = req
  try {
    const user = await addCharacter(userId, characterId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
fav.delete('/delete/:charId', userExtractor, async (req, res) => {
  const { charId } = req.params
  const { userId } = req
  try {
    const dele = await deleteFav(charId, userId)
    res.status(200).json({ Delete: 'success', characterdeted: dele })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

module.exports = fav
