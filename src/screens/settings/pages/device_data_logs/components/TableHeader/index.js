import React from 'react'
import { Button } from '@mui/material'
import { GridToolbarExport } from '@mui/x-data-grid';
function Header(props) {
    return (
        <div className="table-header">
            <Button onClick={() => {console.log(props)}}>Filtrele</Button>
            <GridToolbarExport />
        </div>
    );
}

export default Header
