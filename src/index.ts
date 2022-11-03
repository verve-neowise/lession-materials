import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars';

import { serverConfig } from '@configs/index'
import { requestLogger } from '@middlewares/index';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('static'))
app.use(express.static('lessions'))

app.use(requestLogger)


app.listen(serverConfig.port, () => {
    console.log(`Server running on http://localhost:${serverConfig.port}`)
})
