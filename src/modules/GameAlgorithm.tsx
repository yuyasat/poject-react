import _ from 'lodash';

import { GridState, TopState } from '../Types';

import Color from './Color';
import GameSetting from './GameSetting';
import KeyCode from './KeyCode';
import {
  getMovedFirstColumn,
  getMovedSecondColumn,
  getRotatedSecondColumn,
  getRotatedSecondRow,
} from './KeyOperation';

export const getTopState = (
  topState: TopState,
  keyCode: string
):
  | {
      firstColumn?: number;
      secondColumn?: number;
      secondRow?: number;
    }
  | undefined => {
  if (keyCode === KeyCode.right) {
    return {
      firstColumn: getMovedFirstColumn(topState, 'right'),
      secondColumn: getMovedSecondColumn(topState, 'right'),
    };
  }
  if (keyCode === KeyCode.left) {
    return {
      firstColumn: getMovedFirstColumn(topState, 'left'),
      secondColumn: getMovedSecondColumn(topState, 'left'),
    };
  }
  if (keyCode === KeyCode.x || keyCode === KeyCode.up) {
    return {
      secondColumn: getRotatedSecondColumn(topState, 'right'),
      secondRow: getRotatedSecondRow(topState, 'right'),
    };
  }
  if (keyCode === KeyCode.z) {
    return {
      secondColumn: getRotatedSecondColumn(topState, 'left'),
      secondRow: getRotatedSecondRow(topState, 'left'),
    };
  }
};

export const getTopGridStates = (topState: TopState): GridState[][] => {
  const { firstColumn, firstRow, firstColor, secondColumn, secondRow, secondColor } = topState;

  let topGridStates = _.times(GameSetting.topFieldRow, () =>
    _.times(GameSetting.column, () => ({
      color: Color.none,
    }))
  );

  topGridStates[firstRow][firstColumn].color = firstColor;
  topGridStates[secondRow][secondColumn].color = secondColor;

  return topGridStates;
};

export const countColor = (j: number, i: number, gridStates: GridState[][]): number => {
  const _gridStates = structuredClone(gridStates);
  const { color } = _gridStates[j][i];
  let n = 1;
  _gridStates[j][i].color = Color.none;
  if (j - 1 >= 0 && _gridStates[j - 1][i].color === color && color !== Color.none) {
    n += countColor(j - 1, i, _gridStates);
  }
  if (j + 1 < GameSetting.row && _gridStates[j + 1][i].color === color && color !== Color.none) {
    n += countColor(j + 1, i, _gridStates);
  }
  if (i - 1 >= 0 && _gridStates[j][i - 1].color === color && color !== Color.none) {
    n += countColor(j, i - 1, _gridStates);
  }
  if (i + 1 < GameSetting.column && _gridStates[j][i + 1].color === color && color !== Color.none) {
    n += countColor(j, i + 1, _gridStates);
  }
  _gridStates[j][i].color = color;
  return n;
};

export const deleteColor = (j: number, i: number, gridStates: GridState[][]): GridState[][] => {
  let _gridStates = structuredClone(gridStates);

  const { color } = _gridStates[j][i];
  _gridStates[j][i].color = Color.none;
  if (j - 1 >= 0 && _gridStates[j - 1][i].color === color) {
    _gridStates = deleteColor(j - 1, i, _gridStates);
  }
  if (j + 1 < GameSetting.row && _gridStates[j + 1][i].color === color) {
    _gridStates = deleteColor(j + 1, i, _gridStates);
  }
  if (i - 1 >= 0 && _gridStates[j][i - 1].color === color) {
    _gridStates = deleteColor(j, i - 1, _gridStates);
  }
  if (i + 1 < GameSetting.column && _gridStates[j][i + 1].color === color) {
    _gridStates = deleteColor(j, i + 1, _gridStates);
  }
  return _gridStates;
};

export const allocateGrids = (
  gridStates: GridState[][]
): { count: number; gridStates: GridState[][] } => {
  const _gridStates = structuredClone(gridStates);
  let count = 0;
  for (let i = 0; i < _gridStates[0].length; i++) {
    let spaces = 0;
    for (let j = _gridStates.length - 1; j >= 0; j--) {
      if (!_gridStates[j][i].color) {
        spaces++;
      } else if (spaces > 0) {
        _gridStates[j + spaces][i].color = _gridStates[j][i].color;
        _gridStates[j][i].color = Color.none;
        count++;
      }
    }
  }
  return { count, gridStates: _gridStates };
};

export const getDropedGridStates = (
  gridStates: GridState[][],
  topState: TopState
): GridState[][] => {
  const _gridStates = structuredClone(gridStates);
  const { firstRow, firstColumn, secondRow, secondColumn } = topState;

  let r1 = GameSetting.row - 1;
  let dropedFirstRow = secondRow === firstRow + 1 ? r1 - 1 : r1;
  while (r1 >= 0 && _gridStates[r1][topState.firstColumn].color) {
    dropedFirstRow = secondRow === firstRow + 1 ? r1 - 2 : r1 - 1;
    r1--;
  }

  let r2 = GameSetting.row - 1;
  let dropedSecondRow = secondRow === firstRow - 1 ? r2 - 1 : r2;
  while (r2 >= 0 && _gridStates[r2][secondColumn].color) {
    dropedSecondRow = secondRow === firstRow - 1 ? r2 - 2 : r2 - 1;
    r2--;
  }

  if (dropedFirstRow >= 0) {
    _gridStates[dropedFirstRow][firstColumn].color = topState.firstColor;
  }
  if (dropedSecondRow >= 0) {
    _gridStates[dropedSecondRow][secondColumn].color = topState.secondColor;
  }

  return _gridStates;
};

export const isColumnFilled = (gridStates: GridState[][], topState: TopState): boolean => {
  const { firstColumn, secondColumn } = topState;

  return firstColumn === secondColumn && gridStates[0][firstColumn].color !== Color.none;
};
