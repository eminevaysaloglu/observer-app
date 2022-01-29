import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import TabPanel from 'components/TabPanel/TabPanel'
import { Account, Currency, DataAudit, DeviceDataLogs, SystemSettings, SystemEventNotificationSettings } from './pages'

function Settings() {
  const [tabValue, setTabValue] = useState(0)

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={(_, e) => {
          setTabValue(e)
        }}
        aria-label="basic tabs example"
      >
        <Tab label="HESAP AYARLARI" />
        <Tab label="PARA BİRİMLERİ" />
        <Tab label="CİHAZ VERİ DENETİMİ" />
        <Tab label="SİSTEM OLAY BİLDİRİMLERİ" />
        <Tab label="SİSTEM YÖNETİMİ" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Currency />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <DeviceDataLogs />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <SystemEventNotificationSettings />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <SystemSettings />
      </TabPanel>
    </div>
  )
}

export default Settings
