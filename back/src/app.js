const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mainRouter = require('./routes/mainRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

const corsPermitido = process.env.HOST_FRONT

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(morgan('dev'))
app.use(cors({ origin: corsPermitido }))

app.use(express.json())
app.use(mainRouter)

module.exports = app
