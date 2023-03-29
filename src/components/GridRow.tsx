import React from 'react'
import Grid from './Grid';
import './GridRow.scss';

const GridRow = (props: any) => {
  const row = props.gridStateRow.map((gridState: any, i: number) => {
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