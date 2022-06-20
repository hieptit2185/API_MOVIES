import React, { useState } from 'react'
import { Menu } from 'antd'
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

const Home = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="Home">
            <div className="row">
                <div className="col-2">
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
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

export default Home