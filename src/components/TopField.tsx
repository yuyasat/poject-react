import React from 'react'
import GridRow from './GridRow'
import './TopField.scss';

const TopField = (props: any) => {
  const gridRows = props.topGridStates.map((gridStateRow: any, j: number) => {
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