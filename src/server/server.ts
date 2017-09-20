import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as knex from 'knex'

import {checkAnswer, getGame} from './db'
import {SubmitResponse, GetResponse} from './interfaces'

const config = require('../../knexfile')

const environment = process.env.NODE_ENV || 'development'

const db = knex(config[environment])

export const server = express()

server.set('knex', db)
server.use(bodyParser.json())
server.use(express.static('public'))

// Routes

export const router = express.Router()

router.get('/start', (req, res) => {
  return getGame(req.app.get('knex'))
    .then((result: GetResponse) => res.json(result))
    .catch((err: Error) => res.status(500).json({error: err.message}))
})

router.post('/submit', (req, res) => {
  const id = Number(req.body.id)
  if (!id || isNaN(id)) return res.status(500).send('No ID found')
  const time = Number(req.body.time)
  if (!time || isNaN(time)) return res.status(500).send('No time found')
  const x = Number(req.body.x)
  if (!x || isNaN(x)) return res.status(500).send('No x found')
  const y = Number(req.body.y)
  if (!y || isNaN(y)) return res.status(500).send('No y found')
  return checkAnswer(id, time, x, y, req.app.get('knex'))
    .then((result: SubmitResponse) => res.json(result))
    .catch((err: Error) => res.status(500).json({error: err.message}))
})

server.use('/', router)
