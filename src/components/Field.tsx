import React, { useEffect, useReducer, useState } from 'react'

import _ from 'lodash';

import './Field.scss';
import { TopState } from '../Types';
import Color from '../modules/Color';
import { allocateGrids, countColor, deleteColor, getDropedGridStates, isColumnFilled } from '../modules/GameAlgorithm';
import GameSetting from '../modules/GameSetting';
import KeyCode from '../modules/KeyCode';
import { getMovedFirstColumn, getMovedSecondColumn, getRotatedSecondColumn, getRotatedSecondRow } from '../modules/KeyOperation';

import Controller from './Controller';
import GridRow from './GridRow';
import NextField from './NextField';
import Result from './Result';
import TopField from './TopField';

const getInitialColor = (j: number, i: number, topState: any) => {
  if (i === GameSetting.initialColumn && j === GameSetting.initialSecondRow) {
    return topState.secondColor
  }
  if (i === GameSetting.initialColumn && j === GameSetting.initialFirstRow) {
    return topState.firstColor
  }
  return Color.none
}

const topStateField: TopState = {
  firstColumn: GameSetting.initialColumn,
  secondColumn: GameSetting.initialColumn,
  firstRow: GameSetting.initialFirstRow,
  secondRow: GameSetting.initialSecondRow,
  firstColor: Color.none,
  secondColor: Color.none
}

const initialTopState: TopState = Object.assign(topStateField, {
  firstColor: Math.floor(Math.random() * 4) + 1,
  secondColor: Math.floor(Math.random() * 4) + 1
})

const initialTopGridStates = _.times(GameSetting.topFieldRow, (j) =>
  _.times(GameSetting.column, (i) => ({
    color: getInitialColor(j, i, initialTopState)
  }))
)

const initialGridState = _.times(GameSetting.row, () =>
  _.times(GameSetting.column, () => ({
    color: Color.none
  }))
);

const initialNextState = {
  firstColor: Math.floor(Math.random() * 4) + 1,
  secondColor: Math.floor(Math.random() * 4) + 1
}

const initialNextNextState = {
  firstColor: Math.floor(Math.random() * 4) + 1,
  secondColor: Math.floor(Math.random() * 4) + 1
}

const getTopState = (topState: TopState, keyCode: number) => {
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

const getTopGridStates = (topState: TopState) => {
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


const styles = () => {
  return {
    fieldWrap: {
      width: `${(GameSetting.column * 30) + 200}px`,
      height: `${(GameSetting.row * 20) + 140}px`
    },
    field: {
      width: `${(GameSetting.column * 30) + 50}px`
    }
  }
}

const Field = () => {
  const [topState, setTopState] = useState(initialTopState);
  const [topGridStates, setTopGridStates] = useState(initialTopGridStates);
  const [gridStates, setGridStates] = useState(initialGridState);
  const [nextState, setNextState] = useState(initialNextState);
  const [nextNextState, setNextNextState] = useState(initialNextNextState);
  const [chainCount, setChainCount] = useState(0);
  const [maxChainCount, setMaxChainCount] = useState(0);
  const [keyAccept, setKeyAccept] = useState(true);


  useEffect(() => {
    if (keyAccept) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyAccept]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === KeyCode.down) {
      handleDown()
      return
    }


    setTopState((currentTopState: any) => {
      const _topState = Object.assign(
        {},
        currentTopState,
        getTopState(currentTopState, e.keyCode)
      )
      setTopGridStates(getTopGridStates(_topState));
      return _topState;
    })
  }

  const handleDown = () => {
    if (isColumnFilled(gridStates, topState)) { return }

    const _gridStates = getDropedGridStates(gridStates, topState)

    setGridStates(_gridStates);
    setKeyAccept(false);

    setTimeout(() => {
      chain(gridStates, 0)
    }, 200)

    const waitingTopState = Object.assign(initialTopState, {
      firstColor: nextState.firstColor,
      secondColor: nextState.secondColor
    })

    const waitingNextState = {
      firstColor: nextNextState.firstColor,
      secondColor: nextNextState.secondColor
    }

    const waitingNextNextState = {
      firstColor: Math.floor(Math.random() * 4) + 1,
      secondColor: Math.floor(Math.random() * 4) + 1
    }

    setTopGridStates(getTopGridStates(waitingTopState));
    setTopState(waitingTopState);
    setNextState(waitingNextState);
    setNextNextState(waitingNextNextState);
  }

  const chain = (chainedGridStates: any, chainCount: number) => {
    const {
      gridStates, countedChainCount
    } = getDeletedGridStates(chainedGridStates, chainCount)

    chainCount = countedChainCount

    setTimeout(() => {
      setGridStates(gridStates)

      setTimeout(() => {
        dropGrids(gridStates, chainCount)
      }, 200)
    }, 200)

    return gridStates
  }


  const getDeletedGridStates = (gridStates: any, chainCount: number) => {
    let deletedColor = Color.none
    gridStates.forEach((grids: any, j: number) => {
      grids.forEach((grid: any, i: number) => {
        if (grid.color !== Color.none && countColor(j, i, gridStates) >= 4) {
          if (deletedColor === Color.none || deletedColor === grid.color) {
            deletedColor = grid.color
            chainCount++
          }
          gridStates = deleteColor(j, i, gridStates)
          setChainCount(chainCount);
          if (maxChainCount < chainCount) {
            setMaxChainCount(chainCount);
          }
        }
      })
    })

    return { gridStates, countedChainCount: chainCount }
  }

  const dropGrids = (deletedGridStates: any, chainCount: number) => {
    const { count, gridStates } = allocateGrids(deletedGridStates)

    setGridStates(gridStates);

    if (count > 0) {
      setTimeout(() => { chain(gridStates, chainCount) }, 200)
    } else {
      setKeyAccept(true);
    }
  }

  const grids = gridStates.map((gridStateRow: any, j: number) => {
    return (
      <GridRow
        key={`row${j}`}
        type='Field'
        gridStateRow={gridStateRow} />
    )
  })

  return (
    <div>
      <div className='FieldWrap' style={styles().fieldWrap}>
        <div className='Field' style={styles().field}>
          <TopField
            topState={topState}
            topGridStates={topGridStates}
            keyAccept={keyAccept} />
          {grids}
        </div>
        <NextField nextNum={1} nextState={nextState} />
        <NextField nextNum={2} nextState={nextNextState} />
        <Result chainCount={chainCount} maxChainCount={maxChainCount} />
      </div>
      <Controller onKeyDown={handleKeyDown} />
    </div>
  )
}

export default Field