export interface Tile {
  x: number
  y: number
  tileId: string
}

export interface TileMap {
  width: number,
  height: number,
  tiles: Tile[]
}

export interface Coord {
  x: number
  y: number
}

export interface IslandMap {
  width: number
  height: number
  islands: Coord[]
}

export interface Movements {
  start: Coord
  movements: Coord[]
}