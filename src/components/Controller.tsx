import React from 'react'
import ControllerButton from './ControllerButton'
import './Controller.scss';

const Controller = (props: any) => {
  return (
    <div>
      <div className='ControllerButtomWrap'>
        <ControllerButton keyName='Left' onClick={props.onKeyDown} />
        <ControllerButton keyName='Right' onClick={props.onKeyDown} />
        <ControllerButton keyName='X' onClick={props.onKeyDown} />
        <ControllerButton keyName='Z' onClick={props.onKeyDown} />
        <div className='Clear' />
      </div>
      <ControllerButton keyName='Down' onClick={props.onKeyDown} />
    </div>
  )
}

export default Controller