import {Coord, IslandMap} from './interfaces'

export function makeSolution(islandMap: IslandMap): {start: Coord, end: Coord, movements: Coord[]} {
  let start: Coord
  while (!start) {
    const x = Math.floor(Math.random() * islandMap.width)
    const y = Math.floor(Math.random() * islandMap.height)
    if (!isBlocked({x, y}, islandMap.islands)) {
      start = {x, y}
    }
  }
}

export function isOnlySingleSolution(solution: Coord[], islandMap: IslandMap): boolean {
  let foundSolution: boolean = false
  for (let startX = 0; startX < islandMap.width; startX++) {
    for (let startY = 0; startY < islandMap.height; startY++) {
      let start = {x: startX, y: startY}
      if (!isBlocked(start, islandMap.islands)) {
        let validSolution = true
        solution.forEach((coord: Coord) => {
          const position: Coord = {x: start.x + coord.x, y: start.y + coord.y}
          if (isBlocked(position, islandMap.islands) || isOutOfBounds(position, islandMap)) {
            validSolution = false
          }
        })
        if (validSolution) {
          if (foundSolution) {
            return false
          } else {
            foundSolution = true
          }
        }
      }
    }
  }
  return foundSolution
}

export function isBlocked(position: Coord, arr: Coord[]): boolean {
  if (arr.find((coord: Coord) => coord.x === position.x && coord.y === position.y)) {
    return true
  }
  return false
}

export function isOutOfBounds(position: Coord, islandMap: IslandMap): boolean {
  return position.x < 0 || position.x >= islandMap.width || position.y < 0 || position.y >= islandMap.height
}