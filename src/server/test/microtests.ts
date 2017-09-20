import 'mocha'
import {expect} from 'chai'

import {getIslandsFromTile, makeTileMap, convertMapToString, convertStringToMap, getIslandMap, mapWidth, mapHeight} from '../game/map'

describe('getIslandsFromTile', () => {
  it('returns correct array', () => {
    const expected = [{x: 2, y: 1}, {x: 2, y: 2}]
    expect(getIslandsFromTile('1')).to.eql(expected)
  })
  it('returns a blank array when invalid id is provided', () => {
    expect(getIslandsFromTile('10')).to.eql([])
  })
})

describe('makeTileMap', () => {
  it('returns object with correct width and height', () => {
    expect(makeTileMap().width).to.eql(mapWidth)
    expect(makeTileMap().height).to.eql(mapHeight)
  })
  it('returns an array of tiles', () => {
    expect(makeTileMap().tiles).to.be.an('array')
  })
  it('returns all nine tiles', () => {
    const tiles = makeTileMap().tiles
    const tileIds = tiles.map((tile) => tile.tileId).sort()
    expect(tileIds).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
  })
})

const exampleTileMap1 = {
  width: 3,
  height: 3,
  tiles: [
    {tileId: '1', x: 0, y: 0},
    {tileId: '2', x: 1, y: 0},
    {tileId: '3', x: 2, y: 0},
    {tileId: '4', x: 0, y: 1},
    {tileId: '5', x: 1, y: 1},
    {tileId: '6', x: 2, y: 1},
    {tileId: '7', x: 0, y: 2},
    {tileId: '8', x: 1, y: 2},
    {tileId: '9', x: 2, y: 2}
  ]
}
const exampleTileString1 = '123,456,789,'
const exampleTileMap2 = {
  width: 3,
  height: 3,
  tiles: [
    {tileId: '1', x: 0, y: 0},
    {tileId: '2', x: 1, y: 0},
    {tileId: '8', x: 1, y: 2},
    {tileId: '3', x: 2, y: 0},
    {tileId: '5', x: 1, y: 1},
    {tileId: '6', x: 2, y: 1},
    {tileId: '4', x: 0, y: 1},
    {tileId: '7', x: 0, y: 2},
    {tileId: '9', x: 2, y: 2}
  ]
}
const exampleTileString2 = '123,456,789,'
const exampleTileMap3 = {
  width: 3,
  height: 3,
  tiles: [
    {tileId: '4', x: 0, y: 0},
    {tileId: '2', x: 1, y: 0},
    {tileId: '8', x: 2, y: 0},
    {tileId: '3', x: 0, y: 1},
    {tileId: '5', x: 1, y: 1},
    {tileId: '7', x: 2, y: 1},
    {tileId: '1', x: 0, y: 2},
    {tileId: '6', x: 1, y: 2},
    {tileId: '9', x: 2, y: 2}
  ]
}
const exampleTileString3 = '428,357,169,'

describe('convertmapToString', () => {
  it('returns the correct string', () => {
    expect(convertMapToString(exampleTileMap1)).to.eql(exampleTileString1)
  })
  it('returns the correct string when the tiles are shuffled', () => {
    expect(convertMapToString(exampleTileMap2)).to.eql(exampleTileString2)
  })
  it('returns the correct string when the tile ids are randomised', () => {
    expect(convertMapToString(exampleTileMap3)).to.eql(exampleTileString3)
  })
})

describe('convertStringToMap', () => {
  it('returns the correct object', () => {
    expect(convertStringToMap(exampleTileString1)).to.eql(exampleTileMap1)
  })
  it('returns the correct object when the ids are randomised', () => {
    expect(convertStringToMap(exampleTileString3)).to.eql(exampleTileMap3)
  })
})