import React from 'react'
import { CardMedia } from '@mui/material'
import empty from 'assets/images/empty.png'
import './style.scss'

function index(props) {
  return (
    <div className="empty">
      <CardMedia component="img" image={empty} sx={{ width: props.imageWidth || 300 }} />
      <div className="title">{props.title || 'Veri bulunamadı'}</div>
      <div className="actions">{props.actions}</div>
    </div>
  )
}

export default index
