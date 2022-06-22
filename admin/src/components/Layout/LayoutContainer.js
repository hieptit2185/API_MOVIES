import React, { useState } from 'react'
import { Menu } from 'antd'
import './style.css'
import { useLocation } from "react-router-dom"
import {
    AppstoreOutlined,
    ContainerOutlined,
    PieChartOutlined,
} from '@ant-design/icons'
import { Link } from "react-router-dom"


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(<Link to="/home">Home</Link>, '1', <PieChartOutlined />),
    getItem(<Link to="/movies">Movies</Link>, '2', <ContainerOutlined />),
    getItem(<Link to="/lists">Lists</Link>, '3', <AppstoreOutlined />),
    getItem(<Link to="/users">Users</Link>, '4', <AppstoreOutlined />),
]

const LayoutContainer = ({ children }) => {

    const history = useLocation()

    const showItemsMenu = (pathname) => {
      switch(pathname){
        case '/home':
            return '1'
        case '/movies':
            return '2'
        case '/lists':
            return '3'
        case '/users':
            return '4'
        default:
      }
    }

    return (
        <div className="LayoutContainer">
            <div className="row mr-0 h-100">
                <div className="col-2">
                    <Menu
                        selectedKeys={[showItemsMenu(history.pathname)]}
                        openKeys={['2']}
                        mode="inline"
                        theme="dark"
                        // inlineCollapsed={collapsed}
                        items={items}
                    />
                </div>
                <div className="col-10">
                    <div className="RigtContent">
                        <div className="content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutContainer