import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./style.css"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate()
    const url = "http://localhost:3100"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const _handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await axios.post(`${url}/api/auth/login`,
                {
                    email,
                    password
                },
            )
            Object.keys(res.data).length && localStorage.setItem('user', JSON.stringify(res.data))

            if(!res.data.isAdmin) return setError('Your account is not Admin!!')
            if (res.data.isAdmin) return navigate("/users")
        } catch (e) {
            setError(!!e.response.data ? e.response.data : '')
        }
    }

    const changeEmail = e => {
        setError('')
        setEmail(e.target.value)
    }

    const changePassword = e => {
        setError('')
        setPassword(e.target.value)
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
            <div id="login">
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={_handleSubmit}>
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Username:</label><br />
                                        <input type="text" name="username" id="username" className="form-control" value={email} onChange={changeEmail} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Password:</label><br />
                                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={changePassword} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
                                    </div>
                                    <div className="text-danger">{!!error && error}</div>
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