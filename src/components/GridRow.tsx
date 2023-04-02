import React from 'react'

import { GridState } from '../Types';

import Grid from './Grid';
import './GridRow.scss';

interface Props {
  type: string;
  gridStateRow: GridState[];
}

const GridRow = (props: Props) => {
  const row = props.gridStateRow.map((gridState: GridState, i: number) => {
    return (
      <Grid
        key={`grid${i}`}
        type={props.type}
        gridState={gridState} />
    )
  })

  return (
    <div className='GridRow'>
      {row}
    </div>
  )
}

export default GridRow