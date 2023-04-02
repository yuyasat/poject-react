import React from 'react'

import { GridState } from '../Types';
import Color from '../modules/Color';
import './Grid.scss';

interface Props {
  gridState: GridState;
  type?: string;
}
const Grid = (props: Props) => {
  const colorName = props.gridState.color === Color.none ? '' : `Grid${props.gridState.color}`

  return (
    <div className={`Grid ${colorName} ${props.type}Grid`} />
  )

}

export default Grid