import React, { useState, useEffect } from 'react'
import { TextField, Select, MenuItem, Input, Button } from '@mui/material'
import './style.scss'

function CustomFilterPanel(props) {
    const firstFieldIndex = props.value.findIndex((item) => !item.notFilter && item.type !== 'actions')
    const [by, setBy] = useState(props.value[firstFieldIndex].field)
    const [isSelectorOpen, setisSelectorOpen] = useState(false)
    const [searchText, setSearchText] = useState('')

    function filter() {
        props.filter(by, searchText)
    }

    function handleSelect(e) {
        setBy(e.target.value);
        setSearchText('');
    }

    return (
        <div className="custom-filter-panel">
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={by}
                label="Göre"
                open={isSelectorOpen}
                onChange={(e) => handleSelect(e)}
                input={(
                    <Input
                        onClick={() => setisSelectorOpen(!isSelectorOpen)}
                    />
                )}
            >
                {
                    props.value.map((item) => !item.notFilter && item.type !== 'actions' ? <MenuItem key={item.field} value={item.field}>{item.headerName}</MenuItem> : null)
                }

            </Select>
            göre
            <TextField className="text-field-search" placeholder="Aramak istediğinizi yazınız" size="small" variant="standard" value={searchText} onChange={(e)=>setSearchText(e.target.value)} inputMode="search" />
            <Button onClick={filter}>Ara</Button>
        </div>
    )
}

export default CustomFilterPanel
