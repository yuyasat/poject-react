import _ from "lodash"

import { TopState } from "../Types"

import Color from "./Color"
import GameSetting from './GameSetting'
import KeyCode from "./KeyCode"
import {
  getMovedFirstColumn,
  getMovedSecondColumn,
  getRotatedSecondColumn,
  getRotatedSecondRow
} from "./KeyOperation"

export const getTopState = (topState: TopState, keyCode: number) => {
  if (keyCode === KeyCode.right) {
    return {
      firstColumn: getMovedFirstColumn(topState, 'right'),
      secondColumn: getMovedSecondColumn(topState, 'right')
    }
  }
  if (keyCode === KeyCode.left) {
    return {
      firstColumn: getMovedFirstColumn(topState, 'left'),
      secondColumn: getMovedSecondColumn(topState, 'left')
    }
  }
  if (keyCode === KeyCode.x || keyCode === KeyCode.up) {
    return {
      secondColumn: getRotatedSecondColumn(topState, 'right'),
      secondRow: getRotatedSecondRow(topState, 'right')
    }
  }
  if (keyCode === KeyCode.z) {
    return {
      secondColumn: getRotatedSecondColumn(topState, 'left'),
      secondRow: getRotatedSecondRow(topState, 'left')
    }
  }
}

export const getTopGridStates = (topState: TopState) => {
  const { firstColumn, firstRow, firstColor, secondColumn, secondRow, secondColor } = topState

  let topGridStates = _.times(GameSetting.topFieldRow, () =>
    _.times(GameSetting.column, () => ({
      color: Color.none
    }))
  )

  topGridStates[firstRow][firstColumn].color = firstColor
  topGridStates[secondRow][secondColumn].color = secondColor

  return topGridStates
}

export const countColor = (j: number, i: number, gridStates: any) => {
  const { color } = gridStates[j][i]
  let n = 1
  gridStates[j][i].color = Color.none
  if (j - 1 >= 0 && gridStates[j - 1][i].color === color) {
    n += countColor(j - 1, i, gridStates)
  }
  if (j + 1 < GameSetting.row && gridStates[j + 1][i].color === color) {
    n += countColor(j + 1, i, gridStates)
  }
  if (i - 1 >= 0 && gridStates[j][i - 1].color === color) {
    n += countColor(j, i - 1, gridStates)
  }
  if (i + 1 < GameSetting.column && gridStates[j][i + 1].color === color) {
    n += countColor(j, i + 1, gridStates)
  }
  gridStates[j][i].color = color
  return n
}

export const deleteColor = (j: number, i: number, gridStates: any) => {
  const { color } = gridStates[j][i]
  gridStates[j][i].color = Color.none
  if (j - 1 >= 0 && gridStates[j - 1][i].color === color) {
    deleteColor(j - 1, i, gridStates)
  }
  if (j + 1 < GameSetting.row && gridStates[j + 1][i].color === color) {
    deleteColor(j + 1, i, gridStates)
  }
  if (i - 1 >= 0 && gridStates[j][i - 1].color === color) {
    deleteColor(j, i - 1, gridStates)
  }
  if (i + 1 < GameSetting.column && gridStates[j][i + 1].color === color) {
    deleteColor(j, i + 1, gridStates)
  }
  return gridStates
}

export const allocateGrids = (gridStates: any) => {
  let count = 0
  for (let i = 0; i < gridStates[0].length; i++) {
    let spaces = 0
    for (let j = gridStates.length - 1; j >= 0; j--) {
      if (!gridStates[j][i].color) {
        spaces++
      } else if (spaces > 0) {
        gridStates[j + spaces][i].color = gridStates[j][i].color
        gridStates[j][i].color = Color.none
        count++
      }
    }
  }
  return { count, gridStates }
}

export const getDropedGridStates = (gridStates: any, topState: TopState) => {
  const { firstRow, firstColumn, secondRow, secondColumn } = topState

  let r1 = GameSetting.row - 1
  let dropedFirstRow = secondRow === firstRow + 1 ? r1 - 1 : r1
  while (r1 >= 0 && gridStates[r1][topState.firstColumn].color) {
    dropedFirstRow = secondRow === firstRow + 1 ? r1 - 2 : r1 - 1
    r1--
  }

  let r2 = GameSetting.row - 1
  let dropedSecondRow = secondRow === firstRow - 1 ? r2 - 1 : r2
  while (r2 >= 0 && gridStates[r2][secondColumn].color) {
    dropedSecondRow = secondRow === firstRow - 1 ? r2 - 2 : r2 - 1
    r2--
  }

  if (dropedFirstRow >= 0) {
    gridStates[dropedFirstRow][firstColumn].color = topState.firstColor
  }
  if (dropedSecondRow >= 0) {
    gridStates[dropedSecondRow][secondColumn].color = topState.secondColor
  }

  return gridStates
}

export const isColumnFilled = (gridStates: any, topState: TopState) => {
  const { firstColumn, secondColumn } = topState

  return firstColumn === secondColumn && gridStates[0][firstColumn].color !== Color.none
}