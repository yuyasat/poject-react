import React from 'react';

import { GridState } from '../Types';
import Color from '../modules/Color';
import './Grid.scss';

interface Props {
  gridState: GridState;
  type?: string;
  isEndOfColumn?: boolean;
  isEndOfRow?: boolean;
}
const Grid = (props: Props) => {
  const colorName = props.gridState.color === Color.none ? '' : `Grid${props.gridState.color}`;

  return (
    <div
      className={`Grid ${props.type}Grid ${
        props.type !== 'Top' && props.isEndOfColumn ? 'RightGrid' : ''
      } ${props.isEndOfRow ? 'ButtomGrid' : ''}`}
    >
      <div className={`GridCircle ${colorName}`} />
    </div>
  );
};

export default Grid;
