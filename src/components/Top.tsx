import React from 'react'
import GridRow from './GridRow'
import './Top.scss';

const Top = (props: any) => {
  const gridRows = props.topGridStates.map((gridStateRow: any, j: number) => {
    console.log(j);
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

export default Top