import React, { useState, useEffect, useContext } from 'react'
import './style.scss'
import { items } from './sidebar_items'
import { NavLink } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowForward, IoIosLogOut } from 'react-icons/io'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import classNames from 'classnames'
import { withRouter, useHistory } from 'react-router-dom'
import authContext from '../../store/AuthContext'
import { auth } from 'utils/auth'
import { FaUserAlt } from 'react-icons/fa'

function Sidebar(props) {
  const [openIndex, setOpenIndex] = useState(0)
  const AuthContext = useContext(authContext)
  const history = useHistory()

  function activeClassName(key) {
    return classNames('sidebar-vertical-item', { active: key === openIndex })
  }

  function changeOpenIndex(key) {
    key === openIndex ? setOpenIndex(null) : setOpenIndex(key)
  }

  function openClassName() {
    return classNames('sidebar-vertical', { 'sidebar-open': props.sidebarOpen })
  }

  function sidebarOutClick() {
    if (props.sidebarOpen) return
    setOpenIndex(null)
  }

  useEffect(() => {
    if (location.pathname === '/') return
    const [other, ...newItems] = items
    const matchIndex =
      newItems.findIndex((e) =>
        e.to
          ? location.pathname.startsWith(e.to)
          : null || e.subItems
          ? e.subItems.findIndex((s) => location.pathname.startsWith(s.to))
          : null
      ) + 1
    setOpenIndex(matchIndex)
  }, [])

  function logoutMerchant() {
    auth.logOut()
    AuthContext.setIsLoggedIn(false)
    AuthContext.setIsUser({})
    AuthContext.setPermissions([])
    history.push('/')
  }

  useEffect(() => {
    sidebarOutClick()
  }, [props.sidebarOpen])

  return (
    <div className={openClassName()} onBlur={sidebarOutClick}>
      {items.map((item, key) =>
        item.subItems ? (
          <div key={key}>
            <div to={item.to} className={activeClassName(key)} onClick={() => changeOpenIndex(key)}>
              <div className="lefticon m-left-10">{item.icon}</div>
              <div className="right-side">
                <div className="name-area">
                  <span className="name">{item.name}</span>
                </div>
                <IoIosArrowDown className="active-icon" />
                <IoIosArrowForward className="deactive-icon" />
              </div>
            </div>
            <div className="sub-items">
              {item.subItems.map((subItem, subKey) =>
                subItem.permission ? (
                  AuthContext.permissions.some((e) => e.permission.id === subItem.permission) ? (
                    <NavLink to={subItem.to} activeClassName="subActive" className="sub-item" key={subKey + key}>
                      <div className="icon">O</div>
                      {subItem.title}
                    </NavLink>
                  ) : null
                ) : (
                  <NavLink to={subItem.to} activeClassName="subActive" className="sub-item" key={subKey + key}>
                    <div className="icon">O</div>
                    {subItem.title}
                  </NavLink>
                )
              )}
            </div>
          </div>
        ) : item.permission ? (
          AuthContext.permissions.some((e) => e.permission.id === item.permission) ? (
            <NavLink exact={item.exact} to={item.to} key={key} className="sidebar-vertical-item" activeClassName="active">
              <div className="lefticon m-left-10">{item.icon}</div>
              <div className="right-side">
                <div className="name-area">
                  <span className="name">{item.name}</span>
                </div>
              </div>
            </NavLink>
          ) : null
        ) : (
          <NavLink exact={item.exact} to={item.to} key={key} className="sidebar-vertical-item" activeClassName="active">
            <div className="lefticon m-left-10">{item.icon}</div>
            <div className="right-side">
              <div className="name-area">
                <span className="name">{item.name}</span>
              </div>
            </div>
          </NavLink>
        )
      )}
      <div className="sidebar-vertical-footer">
        <hr />
        <div className="sidebar-vertical-item footer-item">
          <div className="lefticon m-left-10">
            <FaUserAlt size={40} />
          </div>
          <div className="right-side">
            <div className="name-area">
              <span className="name">{AuthContext?.user?.user?.id}</span>
            </div>
          </div>
        </div>
        <div className="sidebar-vertical-item footer-item" onClick={logoutMerchant}>
          <div className="lefticon m-left-10">
            <IoIosLogOut size={40} />
          </div>
          <div className="right-side">
            <div className="name-area">
              <span className="name">Çıkış Yap</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="sidebar-vertical-item footer-item" onClick={() => props.setSidebarOpen(!props.sidebarOpen)}>
          <div className="lefticon collapse-icon-area">
            {props.sidebarOpen ? (
              <FaChevronLeft color="white" className="active-icon " />
            ) : (
              <FaChevronRight color="white" className="deactive-icon " />
            )}
          </div>
          <div className="right-side">
            <div className="name-area">
              <span className="name">Menüyü Daralt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
