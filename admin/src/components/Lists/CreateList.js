import React from 'react'
import ReturnPage from '../../shared/ReturnPage'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Button, Input, Select, message, Spin } from 'antd'


const CreateList = () => {

    const url = "http://localhost:9100"
    const navigate = useNavigate()

    return (
        <div className='CreateList'>
            <ReturnPage url="/lists" title="Back" />
            <h1 className="PageTitle mt-2 mb-2">New Lists</h1>
        </div>
    )
}

export default CreateList