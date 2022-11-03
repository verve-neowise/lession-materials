import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars';

import { serverConfig } from '@configs/index'
import { requestLogger } from '@middlewares/index';

import mainRoutes from '@routes/main.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('static'))

app.use(requestLogger)

app.use(mainRoutes)

app.listen(serverConfig.port, () => {
    console.log(`Server running on http://localhost:${serverConfig.port}`)
})

import { Router } from 'express';

const router = Router()

export default router