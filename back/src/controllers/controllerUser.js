const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User, Character } = require('../db/index')

const getUsers = async () => {
  const users = await User.findAll({
    include: [{ model: Character, through: { attributes: [] } }],
  })
  return users
}

const postUser = async (data) => {

  if (!data.name || !data.username || !data.password)
    throw new Error('Name, username and password are required')

  const passwordhash = await bcrypt.hash(data.password, 10)
  const newUser = await User.create({ ...data, password: passwordhash })

  const { name, id, username } = newUser
  const token = jwt.sign({ username, id }, process.env.SECRET_KEY)
  return { name, token }
}

const addCharacter = async (userId, characterId) => {
  const user = await User.findByPk(userId, {
    include: [{ model: Character, through: [] }],
  }).catch((err) => {
    throw err
  })
  if (!user) throw new Error('User not found')

  await user.addCharacters(characterId).catch((err) => {
    throw err
  })

  return user
}

const loginUser = async (data) => {
  if (!data.username || !data.password)
    throw new Error('Username and password are required')

  const user = await User.findOne({
    where: { username: data.username },
    raw: true,
  })
  if (!user) throw new Error('Incorrect username or password')

  const pass = await bcrypt.compare(data.password, user.password)
  if (!pass) throw new Error('Incorrect username or password')
  const { name, id, username } = user
  const token = jwt.sign({ username, id }, process.env.SECRET_KEY)

  return { name, token }
}

module.exports = { postUser, addCharacter, getUsers, loginUser }
