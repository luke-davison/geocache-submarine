import * as express from 'express'

import {checkAnswer, getGame} from './db'
import {SubmitResponse, GetResponse} from './interfaces'

export const router = express.Router()

router.get('/start', (req, res) => {
  console.log('started')
  return getGame(req.app.get('knex'))
    .then((result: GetResponse) => res.send(result))
    .catch((err: Error) => res.status(500).send(err.message))
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
    .then((result: SubmitResponse) => res.send(result))
    .catch((err: Error) => res.status(500).send(err.message))
})
