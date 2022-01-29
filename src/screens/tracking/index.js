import React from 'react'
import Live from './live'
import History from './history'
import classNames from 'classnames'
import { useLocation, useHistory } from 'react-router-dom'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import RestoreIcon from '@mui/icons-material/Restore'
import './style.scss'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Tracking() {
  const query = useQuery()
  const history = useHistory()
  const tabValue = query.get('type') === 'history' ? 1 : 0

  function activeClass(index) {
    return classNames(
      { active: tabValue === index },
      'flex flex-col items-center justify-center border border-gray-500 rounded-l hover:border-gray-300 cursor-pointer bg-white w-24 h-24'
    )
  }

  return (
    <div>
      {query.get('type') === 'history' ? <History /> : <Live />}
      <div className=" z-50 justify-center items-center mx-auto absolute  bottom-2 left-0 right-0 flex">
        <div className="p-2 shadow-black shadow-lg inline-flex bg-white">
          <div onClick={() => history.push('/')} className={activeClass(0)}>
            <TrackChangesIcon fontSize="large" />
            <div>Canlı</div>
          </div>
          <div onClick={() => history.push('/?type=history')} className={`${activeClass(1)}, ml-2`}>
            <RestoreIcon fontSize="large" />

            <div>Geçmiş</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking
