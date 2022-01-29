import React from 'react'
import { TBoxContainer } from 'components'
import Checkbox from '@mui/material/Checkbox'
import './style.scss'
function PermissionTable(params) {
  function havePermission(permissionName, title) {
    return params.rolePermissions[title]
      ? params.rolePermissions[title].findIndex((e) => e.permission === permissionName) !== -1
      : false
  }

  function sendService(permissionName, title) {
    if (havePermission(permissionName, title)) params.deleteRolePermission(`${title.split(' ').join('_')}_${permissionName}`)
    else params.saveRolePermission(`${title.split(' ').join('_')}_${permissionName}`)
  }

  return (
    <TBoxContainer header actions title={`${params.title}`}>
      <div className="role-table">
        <div className="role-table-header">
          <div className="role-table-header-title">Rol Adı</div>
          <div className="role-table-header-methods">
            <div className="ml-10">Okuma</div>
            <div className="ml-10">Yazma</div>
            <div className="ml-10">Güncelleme</div>
            <div className="ml-10">Silme</div>
          </div>
        </div>
        <div className="role-table-content">
          {Object.keys(params.permissions).map((title) => {
            return (
              <div className="role-table-content-row" key={Math.random()}>
                <div className="role-table-content-row-title">{title}</div>
                <div className="role-table-content-row-methods">
                  <div className="ml-10">
                    <Checkbox
                      onClick={() => sendService('READ', title)}
                      defaultChecked={havePermission('READ', title)}
                      disabled={params.loading}
                    />
                  </div>
                  <div className="ml-10">
                    <Checkbox
                      onClick={() => sendService('CREATE', title)}
                      defaultChecked={havePermission('CREATE', title)}
                      disabled={params.loading}
                    />
                  </div>
                  <div className="ml-10">
                    <Checkbox
                      onClick={() => sendService('UPDATE', title)}
                      defaultChecked={havePermission('UPDATE', title)}
                      disabled={params.loading}
                    />
                  </div>
                  <div className="ml-10">
                    <Checkbox
                      onClick={() => sendService('DELETE', title)}
                      defaultChecked={havePermission('DELETE', title)}
                      disabled={params.loading}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </TBoxContainer>
  )
}

export default PermissionTable
