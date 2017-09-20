import {Coord, IslandMap, DatabaseRow} from '../interfaces'

export function convertMovementsToString(movements: Coord[]): string {
  let currentPosition: Coord = {x: 0, y: 0}
  let str: string = ''
  movements.forEach((movement: Coord) => {
    if (movement.x - currentPosition.x === 0 && movement.y - currentPosition.y === -1) {
      str+= 'N'
    } else if (movement.x - currentPosition.x === 1 && movement.y - currentPosition.y === 0) {
      str+= 'E'
    } else if (movement.x - currentPosition.x === 0 && movement.y - currentPosition.y === 1) {
      str+= 'S'
    } else if (movement.x - currentPosition.x === -1 && movement.y - currentPosition.y === 0) {
      str+= 'W'
    }
    currentPosition = movement
  })
  return str
}

export function convertStringToMovements(str: string): Coord[] {
  let currentPosition: Coord = {x: 0, y: 0}
  const movements: Coord[] = []
  str.split('').forEach((letter: string) => {

    switch (letter) {
      case 'N': currentPosition.y--; break;
      case 'E': currentPosition.x++; break;
      case 'S': currentPosition.y++; break;
      case 'W':  currentPosition.x--; break;
      default: console.log('Unknown letter found while converting string to movement'); break;
    }
    movements.push({x: currentPosition.x, y: currentPosition.y})

  })
  return movements
}

export function convertPositionToString(position: Coord): string {
  return `${position.x},${position.y}`
}

export function convertStringToPosition(str: string): Coord {
  const x = Number(str.slice(0,str.indexOf(',')))
  const y = Number(str.slice(str.indexOf(',') + 1))
  return {x, y}
}

export function makeMovements(islandMap: IslandMap): {start: Coord, end: Coord, movements: Coord[]} {
  let start: Coord
  while (!start) {
    const x = Math.floor(Math.random() * islandMap.width)
    const y = Math.floor(Math.random() * islandMap.height)
    if (!isBlocked({x, y}, islandMap.islands)) {
      start = {x, y}
    }
  }
  const movements: Coord[] = []
  let currentPosition: Coord = {x: start.x, y: start.y}
  let isStuck: boolean = false
  while (!isStuck) {
    let foundMove: boolean = false
    const possibleMovements: Coord[] = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}]
    while (!isStuck && !foundMove) {
      const r = Math.floor(Math.random() * possibleMovements.length)
      const movement: Coord = possibleMovements.splice(r, 1)[0]
      const position = {x: currentPosition.x + movement.x, y: currentPosition.y + movement.y}
      if (!isBlocked(position, islandMap.islands) && !isBlocked(position, movements) && !isOutOfBounds(position, islandMap)) {
        movements.push(position)
        currentPosition = position
        foundMove = true
      } else {
        if (possibleMovements.length === 0) {
          isStuck = true
        }
      }
    }
  }
  return {start, end: movements[movements.length - 1], movements}
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

export function isCorrectAnswer(game: DatabaseRow, time: number, x: number, y: number): Boolean {
  return false
}

