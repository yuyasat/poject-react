import React, { useEffect, useReducer, useState } from 'react'

import _ from 'lodash';

import './Field.scss';
import { GridState, TopState } from '../Types';
import Color from '../modules/Color';
import { allocateGrids, countColor, deleteColor, getDropedGridStates, getTopGridStates, getTopState, isColumnFilled } from '../modules/GameAlgorithm';
import GameSetting from '../modules/GameSetting';
import { styles } from '../modules/GameSettingStyle';
import KeyCode from '../modules/KeyCode';
import { getMovedFirstColumn, getMovedSecondColumn, getRotatedSecondColumn, getRotatedSecondRow } from '../modules/KeyOperation';
import { initialGridState, initialNextNextState, initialNextState, initialTopGridStates, initialTopState } from '../modules/initialValues';

import Controller from './Controller';
import GridRow from './GridRow';
import NextField from './NextField';
import Result from './Result';
import TopField from './TopField';

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
      return () => {
        // イベントリスナを解除
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyAccept, topState, topGridStates]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === KeyCode.down) {
      handleDown()
      return
    }

    const _topState = Object.assign(
      {},
      topState,
      getTopState(topState, e.code)
    )


    setTopState(_topState);
    setTopGridStates(getTopGridStates(_topState));
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

  const chain = (chainedGridStates: GridState[][], chainCount: number) => {
    const {
      gridStates, countedChainCount
    } = getDeletedGridStates(chainedGridStates, chainCount)

    chainCount = countedChainCount

    setTimeout(() => {
      setTimeout(() => {
        setGridStates(gridStates)
        setTimeout(() => {
          dropGrids(gridStates, chainCount)
        }, 200)
      }, 200)
    }, 200)

    return gridStates
  }

  const getDeletedGridStates = (gridStates: GridState[][], chainCount: number) => {
    let deletedColor = Color.none
    gridStates.forEach((grids: GridState[], j: number) => {
      grids.forEach((grid: GridState, i: number) => {
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

  const dropGrids = (deletedGridStates: GridState[][], chainCount: number) => {
    const { count, gridStates } = allocateGrids(deletedGridStates)

    setGridStates(gridStates);

    if (count > 0) {
      setTimeout(() => { chain(gridStates, chainCount) }, 200)
    } else {
      setKeyAccept(true);
    }
  }

  return (
    <div>
      <div className='FieldWrap' style={styles.fieldWrap}>
        <div className='Field' style={styles.field}>
          <TopField topGridStates={topGridStates} />
          {gridStates.map((gridStateRow: GridState[], j: number) => (
            <GridRow
              key={`row${j}`}
              type='Field'
              gridStateRow={gridStateRow}
              isEndOfRow={j === GameSetting.row - 1} />
          )
          )}
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