import React, { useState } from 'react'
import Color from '../modules/Color';
import GameSetting from '../modules/GameSetting';
import Top from './Top';
import _ from 'lodash';

const initialTopState = {
  firstColumn: GameSetting.initialColumn,
  secondColumn: GameSetting.initialColumn,
  firstRow: GameSetting.initialFirstRow,
  secondRow: GameSetting.initialSecondRow,
  firstColor: Color.none,
  secondColor: Color.none
}

const Field = () => {
  const [topState, setTopState] = useState(initialTopState);

  const getInitialColor = (j: number, i: number, topState: any) => {
    if (i === GameSetting.initialColumn && j === GameSetting.initialSecondRow) {
      return topState.secondColor
    }
    if (i === GameSetting.initialColumn && j === GameSetting.initialFirstRow) {
      return topState.firstColor
    }
    return Color.none
  }

  const _topGridStates = _.times(GameSetting.topFieldRow, (j) =>
    _.times(GameSetting.column, (i) => ({
      color: getInitialColor(j, i, topState)
    }))
  )
  const [topGridStates, setTopGridStates] = useState(_topGridStates);
  const [keyAccept, setKeyAccept] = useState(true);

  const handleDown = () => { }
  return (
    <div>
      <div className='FieldWrap'>
        <div className='Field'>
          <Top
            handleDown={handleDown}
            topState={topState}
            topGridStates={topGridStates}
            keyAccept={keyAccept} />
        </div>
      </div>
    </div>
  )
}

export default Field