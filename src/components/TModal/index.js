import React from 'react'
import classNames from 'classnames'
import './style.scss'
function index(props) {
  function modalClass() {
    return classNames(
      {
        fullWidth: props.fullWidth
      },
      't-modal-wrapper-container'
    )
  }

  return (
    <div className="t-modal-wrapper">
      <div className={modalClass()}>{props.children}</div>
    </div>
  )
}

export default index
