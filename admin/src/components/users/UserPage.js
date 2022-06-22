import React, { useEffect, useState } from 'react'
import DocTitleByStore from '../../shared/DocTitleByStore'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Pagination } from 'antd'

const UserPage = () => {

    const url = "http://localhost:3100"
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {

        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : ''
        const _fetchMovies = async () => {

            setLoading(true)
            setError('')

            try {

                const res = await axios.get(`${url}/api/users`, {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                const { data } = res

                if (data.length) {
                    setUsers(data)
                }
                setLoading(false)
            } catch (e) {
                setError(e.message || 'Unknown error.')
            }
        }

        _fetchMovies()
    }, [])

    const _handlePageChange = (page, limit) => {
        setLimit(limit)
        setPage(page)
    }

    const index0fLast = page * limit
    const index0fFirst = index0fLast - limit
    const currentMovies = users.slice(index0fFirst, index0fLast)


    if (error) return <i className='text-danger fs-14'>{error}</i>

    return (
        <div className='UserPage'>
            <DocTitleByStore title="Users" />
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="PageTitle mt-2 mb-2">Users</h1>
                <div className='col-auto ml-3 ml-sm-0 mr-3 mr-lg-0'>
                    <Link to="/a/movies/new" className="btn btn-primary">Add new user</Link>
                </div>
            </div>
            <div className="SectionInner">
                {
                    !loading && users.length > 0 &&
                    <div className="MoviesTable">
                        <div className="wrapTable">
                            <table className="table">
                                <thead className="ShippingsTableHead">
                                    <tr>
                                        <th className="Product_title">Username</th>
                                        <th className="Supplier">Email</th>
                                        <th className="Zone">Password</th>
                                        <th className="Store">IsAdmin</th>
                                        <th className="Action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length && currentMovies.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.password}</td>
                                                <td>{item.isAdmin ? "Yes" : "No" }</td>
                                                <td>
                                                    <span className="text-primary px-1" style={{ cursor: "pointer" }}>Edit</span>|<span className="text-danger px-1" style={{ cursor: "pointer" }}>Delete</span>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="Pagination d-flex justify-content-between">
                            <div></div>
                            <Pagination current={page} total={users.length} pageSize={limit} onChange={_handlePageChange}
                                className='text-right' showSizeChanger pageSizeOptions={['10', '20', '50', '100']}
                            />
                        </div>
                    </div>
                }
                {
                    loading && <div>Loading...</div>
                }

                {
                    !loading && users.length === 0 && <div>No result</div>
                }


            </div>
        </div>
    )
}

export default UserPage