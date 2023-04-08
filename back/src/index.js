const app = require('./app')
const PORT = process.env.SV_PORT || 3001
const { sequelize } = require('./db/index')

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
})
