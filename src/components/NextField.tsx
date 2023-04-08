import React from 'react';

import Grid from './Grid';

import './NextField.scss';

interface Props {
  nextNum: number;
  nextState: {
    firstColor: number;
    secondColor: number;
  };
}
const NextField = (props: Props) => {
  const { firstColor, secondColor } = props.nextState;

  return (
    <div className="NextField">
      Next{props.nextNum}
      <Grid gridState={{ color: secondColor }} />
      <br />
      <Grid gridState={{ color: firstColor }} />
    </div>
  );
};

export default NextField;
