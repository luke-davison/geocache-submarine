import {SubmitResponse, GetResponse, DatabaseRow, TileMap, IslandMap, Movements} from './interfaces'
import {makeTileMap, convertMapToString, getIslandMap} from './game/map'
import {makeMovements, convertMovementsToString, isCorrectAnswer} from './game/movement'

const answer = String(process.env.answer)

export function getGame(database: any): Promise<GetResponse> {
  const tileMap: TileMap = makeTileMap()
  const tiles: string = convertMapToString(tileMap)
  const islandMap: IslandMap = getIslandMap(tileMap)
  const solution: Movements = makeMovements(islandMap)
  const movements: string = convertMovementsToString(solution.movements)
  const start: string = ''
  const game: DatabaseRow = {tiles, movements, start, completed: false}
  return database('games')
    .insert(game)
    .returning('id')
    .then((id: string) => {
      return {id, tiles, movements}
    })
}

export function checkAnswer(id: number, time: number, x: number, y: number, database: any): Promise<SubmitResponse> {
  return database('games')
    .where('id', id)
    .select()
    .then((games: DatabaseRow[]) => {
      const game = games[0]
      if (isCorrectAnswer(game, time, x, y)) {
        return {correct: true, answer}
      } else {
        return {correct: false}
      }
    })
}