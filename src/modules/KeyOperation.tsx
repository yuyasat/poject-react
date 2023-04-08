import { TopState } from '../Types';

import Setting from './GameSetting';

export const getMovedFirstColumn = (topState: TopState, move: string) => {
  const { firstColumn } = topState;

  if (isValidMove(topState, move)) {
    return { right: firstColumn + 1, left: firstColumn - 1 }[move];
  }
  return firstColumn;
};

export const getMovedSecondColumn = (topState: TopState, move: string) => {
  const { secondColumn } = topState;

  if (isValidMove(topState, move)) {
    return { right: secondColumn + 1, left: secondColumn - 1 }[move];
  }
  return secondColumn;
};

const isValidMove = (topState: TopState, move: string) => {
  const { firstColumn, secondColumn } = topState;

  switch (move) {
    case 'left':
      if (firstColumn === 0) {
        return false;
      }
      if (firstColumn === 1 && secondColumn === 0) {
        return false;
      }
      return true;
    case 'right':
      if (firstColumn === Setting.column - 1) {
        return false;
      }
      if (firstColumn === Setting.column - 2 && secondColumn === Setting.column - 1) {
        return false;
      }
      return true;
    default:
      return true;
  }
};

export const getRotatedSecondColumn = (topState: TopState, rotation: string) => {
  const { firstColumn, firstRow, secondColumn, secondRow } = topState;

  if (!isValidRotation(topState, rotation)) {
    return secondColumn;
  }

  if (secondColumn === firstColumn && secondRow === firstRow - 1) {
    return { right: firstColumn + 1, left: firstColumn - 1 }[rotation];
  }
  if (secondColumn === firstColumn && secondRow === firstRow + 1) {
    return { right: firstColumn - 1, left: firstColumn + 1 }[rotation];
  }
  return firstColumn;
};

export const getRotatedSecondRow = (topState: TopState, rotation: string) => {
  const { firstColumn, firstRow, secondColumn, secondRow } = topState;

  if (!isValidRotation(topState, rotation)) {
    return secondRow;
  }

  if (secondRow === firstRow && secondColumn === firstColumn - 1) {
    return { right: firstRow - 1, left: firstRow + 1 }[rotation];
  }
  if (secondRow === firstRow && secondColumn === firstColumn + 1) {
    return { right: firstRow + 1, left: firstRow - 1 }[rotation];
  }
  return firstRow;
};

const isValidRotation = (topState: TopState, rotation: string) => {
  const { firstColumn, secondRow } = topState;

  if (rotation === 'left') {
    if (firstColumn === 0 && secondRow === 0) {
      return false;
    }
    if (firstColumn === Setting.column - 1 && secondRow === 2) {
      return false;
    }
  }
  if (rotation === 'right') {
    if (firstColumn === 0 && secondRow === 2) {
      return false;
    }
    if (firstColumn === Setting.column - 1 && secondRow === 0) {
      return false;
    }
  }
  return true;
};
