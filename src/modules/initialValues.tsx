import _ from "lodash";

import { TopState } from "../Types";

import Color from "./Color";
import GameSetting from "./GameSetting";

const topStateField: TopState = {
  firstColumn: GameSetting.initialColumn,
  secondColumn: GameSetting.initialColumn,
  firstRow: GameSetting.initialFirstRow,
  secondRow: GameSetting.initialSecondRow,
  firstColor: Color.none,
  secondColor: Color.none
}

export const initialTopState: TopState = Object.assign(topStateField, {
  firstColor: Math.floor(Math.random() * 4) + 1,
  secondColor: Math.floor(Math.random() * 4) + 1
})


const getInitialColor = (j: number, i: number, topState: any) => {
  if (i === GameSetting.initialColumn && j === GameSetting.initialSecondRow) {
    return topState.secondColor
  }
  if (i === GameSetting.initialColumn && j === GameSetting.initialFirstRow) {
    return topState.firstColor
  }
  return Color.none
}

export const initialTopGridStates = _.times(GameSetting.topFieldRow, (j) =>
  _.times(GameSetting.column, (i) => ({
    color: getInitialColor(j, i, initialTopState)
  }))
)

export const initialGridState = _.times(GameSetting.row, () =>
  _.times(GameSetting.column, () => ({
    color: Color.none
  }))
);

export const initialNextState = {
  firstColor: Math.floor(Math.random() * 4) + 1,
  secondColor: Math.floor(Math.random() * 4) + 1
}

export const initialNextNextState = {
  firstColor: Math.floor(Math.random() * 4) + 1,
  secondColor: Math.floor(Math.random() * 4) + 1
}