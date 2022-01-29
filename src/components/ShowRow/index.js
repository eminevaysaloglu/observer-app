import React from 'react'
import './style.scss'
import classNames from 'classnames'

function index(props) {
  var boxClass = classNames('row', props.className)

  return (
    <div className={boxClass}>
      <div className="title">{props.titleComponent ? props.titleComponent : props.title}</div>
      <div className="description">{props.descriptionComponent ? props.descriptionComponent : props.description}</div>
    </div>
  )
}

export default index
