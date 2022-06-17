import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import axios from 'axios'
import "./style.css"

const LoginPage = () => {

    const url = "http://localhost:3100"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const _handleSubmit = async (e) => {
        e.preventDefault()

        const data = await axios.post(`${url}/api/auth/login`,
            {
                email,
                password
            },
        ).then(res => res.data)
        _fetchUser(data.accessToken)
    }

    const _fetchUser = async (token) => {
        await axios.get(`${url}/api/users`, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    }

    return (
        <div className="LoginPage">
            {/* LoginPage
            <Input placeholder="Username" onChange={(e) => setUser(e.target.value)} />
            <Input placeholder="Password" onChange={(e) => setPass(e.target.value)} />
            <Button onClick={_handleSubmit}>Submit</Button> */}
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={_handleSubmit}>
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Username:</label><br />
                                        <input type="text" name="username" id="username" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Password:</label><br />
                                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage