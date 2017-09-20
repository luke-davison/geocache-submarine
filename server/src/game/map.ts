import {Tile, TileMap, Coord as Island, IslandMap} from './interfaces'

const mapWidth = 3
const mapHeight = 3
const tileWidth = 5
const tileHeight = 5

export function getIslandsFromTile(tileId: string): Island[] {
  switch (tileId) {
    case '1': return [{x: 2, y: 1}, {x: 2, y: 2}]
    case '2': return [{x: 1, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}]
    case '3': return [{x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}]
    case '4': return [{x: 1, y: 1}, {x: 1, y: 2}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}]
    case '5': return [{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 1}]
    case '6': return [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]
    case '7': return [{x: 3, y: 0}, {x: 2, y: 1}, {x: 0, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}]
    case '8': return [{x: 2, y: 1}, {x: 1, y: 3}, {x: 3, y: 3}]
    case '9': return [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}]
    default:
      console.log(`Unknown tileId (${tileId}) found while gettting islands from tile`)
      return []
  }
}

export function makeTileMap(): TileMap {
  const arr1: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const tiles: Tile[] = []
  for (let y = 0; y < mapWidth; y++) {
    for (let x = 0; x < mapHeight; x++) {
      const r = Math.floor(Math.random() * arr1.length)
      tiles.push({x, y, tileId: arr1.splice(r, 1)[0]})
    }
  }
  return {width: mapWidth, height: mapHeight, tiles}
}

export function convertMapToString(tileMap: TileMap): string {
  let str = ''
  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      const tile = tileMap.tiles.find((tile: Tile) => tile.x === x && tile.y === y)
      if (!tile) {
        console.log(`Could not find appropriate tile (${x},${y}) in string while converting map to string`)
        str += ' '
      } else {
        str += tile.tileId
      }
    }
    str += ','
  }
  return str
}

export function convertStringToMap(str: string): TileMap {
  let tiles: Tile[] = []
  let x = 0
  let y = 0
  let width = 0
  let height = 0
  str.split('').forEach((tileId: string) => {
    if (tileId === ',') {
      x = 0
      y++
    } else {
      tiles.push({x, y, tileId})
      if (x > width) {
        width = x
      }
      if (y > height) {
        height = y
      }
      x++
    }
  })
  return {width, height, tiles}
}

export function getIslandMap(tileMap: TileMap): IslandMap {
  const islands: Island[] = []
  tileMap.tiles.forEach((tile: Tile) => {
    getIslandsFromTile(tile.tileId).forEach((island: Island) => {
      islands.push({x: tile.x * tileWidth + island.x, y: tile.y * tileHeight + island.y})
    })
  })
  return {width: tileMap.width * tileWidth, height: tileMap.height * tileHeight, islands}
}
