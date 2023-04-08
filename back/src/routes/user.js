const router = require('express').Router()
const {
  postUser,
  addCharacter,
  getUsers,
  loginUser,
} = require('../controllers/controllerUser')
const userExtractor = require('../middleware/userExtractor')

router.get('/', async (req, res) => {
  try {
    let users
    users = await getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await loginUser({username, password})
    res.status(200).json({ ...user })
  } catch (error) {
    res.status(404).json({ message: error.message})
  }
})

router.post('/', async (req, res) => {
  const { name, username, password } = req.body
  try {
    const user = await postUser({name, username, password})
    return res.status(201).json(user)
  } catch (error) {
    if(error.name === "SequelizeUniqueConstraintError"){
      return res.status(400).json({ error: "Invalid Username" })}
    res.status(400).json({ error: error.message })
  }
})

router.put('/:idCharacter', userExtractor,async (req, res) => {
  const { userId } = req
  const { idCharacter } = req.params
  try {
    const user = await addCharacter(userId, idCharacter)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
