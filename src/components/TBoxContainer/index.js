import React from 'react'
import './style.scss'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import classNames from 'classnames'

function index(props) {
  var boxClass = classNames('t-box-container', props.className, { 't-box-container-shadow': props.shadow })
  return (
    <div className={boxClass}>
      {props.header ? (
        <div className="header" onClick={props.onClick || null}>
          <div className="title h6">{props.title}</div>
          {props.notShowAction ? null : (
            <div className="actions">
              {props.actions ? (
                props.actions
              ) : (
                <IconButton sx={{ padding: 0, margin: 0 }} onClick={props.editClick} size="small">
                  <EditIcon sx={{ color: 'white', padding: 0, margin: 0 }} size={24} />
                </IconButton>
              )}
            </div>
          )}
        </div>
      ) : null}
      {props.children ? <div className="content">{props.children}</div> : null}
    </div>
  )
}

export default index
