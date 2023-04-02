import React from 'react'

import { GridState } from '../Types';

import GridRow from './GridRow'
import './TopField.scss';

interface Props {
  topGridStates: GridState[][];
}

const TopField = (props: Props) => {
  const gridRows = props.topGridStates.map((gridStateRow: GridState[], j: number) => {
    return (
      <GridRow
        key={'row' + j}
        type='Top'
        gridStateRow={gridStateRow} />
    )
  })

  return (
    <div className='TopField'>
      {gridRows}
    </div>
  )
}

export default TopField