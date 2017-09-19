import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as knex from 'knex'

const config = require('../../knexfile')

const environment = process.env.NODE_ENV || 'development'

const db = knex(config[environment])

export const server = express()

server.set('knex', db)
server.use(bodyParser.json())
server.use(express.static('../../public'))
