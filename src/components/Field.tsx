import React, { useEffect, useState } from 'react'
import Color from '../modules/Color';
import GameSetting from '../modules/GameSetting';
import TopField from './TopField';
import _ from 'lodash';
import './Field.scss';
import GridRow from './GridRow';
import { TopState } from '../Types';
import { getMovedFirstColumn, getMovedSecondColumn, getRotatedSecondColumn, getRotatedSecondRow } from '../modules/KeyOperation';
import KeyCode from '../modules/KeyCode';

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

const Field = () => {
  const [topState, setTopState] = useState(initialTopState);
  const [topGridStates, setTopGridStates] = useState(initialTopGridStates);
  const [gridStates, setGreidStates] = useState(initialGridState);
  const [nextState, setNextState] = useState(initialNextState);
  const [nextNextState, setNextNextState] = useState(initialNextNextState);
  const [chainCount, setChainCount] = useState(0);
  const [maxChainCount, setMaxChainCount] = useState(0);
  const [keyAccept, setKeyAccept] = useState(true);

  useEffect(() => {
    if (keyAccept) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyAccept]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === KeyCode.down) {
      // this.handleDown()
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

  const handleDown = () => { }

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
      <div className='FieldWrap'>
        <div className='Field'>
          <TopField
            topState={topState}
            topGridStates={topGridStates}
            keyAccept={keyAccept} />
          {grids}
        </div>
      </div>
    </div>
  )
}

export default Field