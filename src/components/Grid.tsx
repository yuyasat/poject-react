import React from 'react'

import Color from '../modules/Color';
import './Grid.scss';

const Grid = (props: any) => {
  const colorName = props.gridState.color === Color.none ? '' : `Grid${props.gridState.color}`

  return (
    <div className={`Grid ${colorName} ${props.type}Grid`} />
  )

}

export default Grid