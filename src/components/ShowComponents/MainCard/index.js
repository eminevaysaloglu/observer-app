import React from 'react'
import './style.scss'
import { TBoxContainer } from 'components'

function index(props) {
  return (
    <TBoxContainer shadow header title={props.mainData.title} onClick={props.mainData.edit}>
      {props.mainData.content.map((data) => (
        <TBoxContainer className="my-10" key={Math.random()}>
          <div className="title">{data.title}</div>
          <div className="description">{data.description}</div>
        </TBoxContainer>
      ))}
    </TBoxContainer>
  )
}

export default index
