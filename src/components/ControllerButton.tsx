import React from 'react'

import KeyCode from '../modules/KeyCode'
import './ControllerButton.scss';

interface Props {
  keyName: 'Left' | 'Up' | 'Right' | 'Down' | 'X' | 'Z';
  onClick: any;
}

const ControllerButton = (props: Props) => {
  const handleClick = () => {
    const _keyName = props.keyName.toLowerCase() as 'left' | 'up' | 'right' | 'down' | 'x' | 'z'
    props.onClick({ keyCode: KeyCode[_keyName] })
  }
  return (
    <div className={`Button${props.keyName}`} onClick={handleClick} />
  )
}

export default ControllerButton