import React from 'react'
import { TBoxContainer, ShowRow } from 'components'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import './style.scss'

function index(props) {
  return props.subDatas.map((subdata) => (
    <TBoxContainer
      className="m-bottom-20"
      header
      key={Math.random()}
      title={subdata.title}
      actions={
        <IconButton onClick={subdata.add}>
          <AddIcon />
        </IconButton>
      }
    >
      {subdata.datas && subdata.datas?.length !== 0 ? (
        subdata.datas?.map((data) => (
          <TBoxContainer
            key={Math.random()}
            className="my-20"
            header
            notShowAction={!(subdata.datas && subdata.datas?.length !== 0)}
            onClick={() => subdata.edit(data.id)}
          >
            {subdata.keyValue ? (
              <ShowRow className="my-10" key={Math.random()} title={data.key} description={data.value} />
            ) : (
              subdata.content.map((c) => (
                <ShowRow className="my-10" key={Math.random()} title={c.title} description={data[c.description]} />
              ))
            )}
          </TBoxContainer>
        ))
      ) : (
        <div>
          <div className="row"> - </div>
        </div>
      )}
    </TBoxContainer>
  ))
}

export default index
