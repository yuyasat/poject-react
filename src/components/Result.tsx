import React from 'react'
import './Result.scss';

interface Props {
  chainCount: number;
  maxChainCount: number;
}
const Result = (props: Props) => {
  return (
    <div className='Result'>
      <div>連鎖数: {props.chainCount}</div>
      <div>最大連鎖数: {props.maxChainCount}</div>
    </div>
  )
}

export default Result