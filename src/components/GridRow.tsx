import React from 'react';

import { GridState } from '../Types';
import GameSetting from '../modules/GameSetting';

import Grid from './Grid';
import './GridRow.scss';

interface Props {
  type: string;
  gridStateRow: GridState[];
  isEndOfRow?: boolean;
}

const GridRow = (props: Props) => {
  const row = props.gridStateRow.map((gridState: GridState, i: number) => {
    return (
      <Grid
        key={`grid${i}`}
        type={props.type}
        gridState={gridState}
        isEndOfColumn={i === GameSetting.column - 1}
        isEndOfRow={props.isEndOfRow}
      />
    );
  });

  return <div className="GridRow">{row}</div>;
};

export default GridRow;
