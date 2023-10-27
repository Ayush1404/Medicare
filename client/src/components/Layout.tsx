import React, { ReactNode, useState } from 'react'
import '../styles/layout.css'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminMenu, doctorMenu, userMenu } from '../constants/Role menus';
import { Badge } from 'antd';


type LayoutProps = {
  children: ReactNode;
};
const Layout = ({children}:LayoutProps) => {
  const userData = useSelector((state: any) => state.userData);
  const [mobile]=useState(window.innerWidth <= 768)
  const [collapsed,setCollapsed] = useState(false);
  const location=useLocation();
  

  const menuToBeRendered = userData.isAdmin? adminMenu : userData.isDoctor? doctorMenu :userMenu;
  return (
    <div className='main'>
      <div className="layout d-flex">
        <div className={`${collapsed ?'collapsed-sidebar':'sidebar'}`}>
          <div className="sidebar-header">
            <h1 className='medicare-logo'>MC</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu)=>{
              const isActive=location.pathname===menu.path;
              return (
                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">
           {!collapsed &&<i className="ri-close-fill close-icon" onClick={()=>{setCollapsed(true)}}></i>}
           {collapsed &&<i className="ri-menu-fill hamburger-icon" onClick={()=>{setCollapsed(false)}}></i>}
           <div className='d-flex align-items-centre'>
           <Badge count={userData.notificationCount} >
            <Link to='/notifications' className='notification-icon'>
                <i className="ri-notification-3-fill"></i>
            </Link>
           </Badge>
            {!mobile && <Link to='/profile' className='username'>{userData.name}</Link> }
            {mobile && <Link to='/profile'> <i className="ri-user-fill profile-icon"></i></Link>}
           </div>
          </div>
          <div className="body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout