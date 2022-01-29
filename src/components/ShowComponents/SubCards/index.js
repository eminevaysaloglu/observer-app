import React, { useState } from 'react'
import { TBoxContainer, ShowRow, NoResult } from 'components'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress, Button } from '@mui/material'
import OpenIcon from '@mui/icons-material/UnfoldMore';
import CloseIcon from '@mui/icons-material/Close';

import './style.scss'

function index(props) {
  const [subDatas, setSubDatas] = useState(props.subDatas || [])

  function headerOnclik(subdata, key) {
    setOpen(key)
    if (!subdata.isOpen) return
    subdata.onClick(key, setSubDatas, () => setLoading(key))
  }

  function setOpen(key) {
    const newSubDatas = [...subDatas]
    newSubDatas[key].isOpen = !newSubDatas[key].isOpen
    setSubDatas(newSubDatas)
  }

  function setLoading(key) {
    const newSubDatas = [...subDatas]
    newSubDatas[key].isLoading = !newSubDatas[key].isLoading
    setSubDatas(newSubDatas)
  }

  return subDatas.map((subdata, key) => (
    <TBoxContainer
      className="m-bottom-20 sub-cards"
      shadow
      header
      key={Math.random()}
      title={subdata.title}
      actions={
        subdata.isOpen ? <CloseIcon sx={{ color: 'white' }} /> : <OpenIcon sx={{ color: 'white' }} />
      }
      onClick={subdata.onClick ? () => headerOnclik(subdata, key) : null}
    >
      {subdata.isOpen && !subdata.isLoading ? (
        subdata.datas && subdata.datas?.length !== 0 ? (
          subdata.datas?.map((data) => (
            <TBoxContainer
              key={Math.random()}
              className="my-20"
              header
              notShowAction={!(subdata.datas && subdata.datas?.length !== 0)}
              editClick={() => subdata.edit(data)}
            >
              {subdata.keyValue ? (
                <ShowRow className="my-10" key={Math.random()} title={data.key.id} description={data.value} />
              ) : (
                subdata.content.map((c) =>
                  c.renderCell ? (
                    c.renderCell(data, Math.random())
                  ) : (
                    <ShowRow className="my-10" key={Math.random()} title={c.title} description={data[c.description]} />
                  )
                )
              )}
            </TBoxContainer>
          ))
        ) : (
          <div className="no-result">
            <NoResult
              actions={
                subdata.add ? (
                  <Button sx={{marginTop: 5}} variant="outlined" startIcon={<AddIcon />} onClick={subdata.add}>
                    Yeni Ekle
                  </Button>
                ) : null
              }
            />
          </div>
        )
      ) : subdata.isOpen && subdata.isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : null}
    </TBoxContainer>
  ))
}

export default index
