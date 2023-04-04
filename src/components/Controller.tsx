import React from 'react'

import ControllerButton from './ControllerButton'
import './Controller.scss';

interface Props {
  onKeyDown: (e: KeyboardEvent) => any;
}

const Controller = (props: Props) => {
  return (
    <div>
      <div className='ControllerButtomWrap'>
        <ControllerButton keyName='Left' onClick={props.onKeyDown} />
        <ControllerButton keyName='Right' onClick={props.onKeyDown} />
        <ControllerButton keyName='X' onClick={props.onKeyDown} />
        <ControllerButton keyName='Z' onClick={props.onKeyDown} />
        <div className='Clear' />
      </div>
      <div className='ControllerButtomWrap'>
        <ControllerButton keyName='Down' onClick={props.onKeyDown} />
      </div>
    </div>
  )
}

export default Controller