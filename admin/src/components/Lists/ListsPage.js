import React, { useEffect, useState } from 'react'
import DocTitleByStore from '../../shared/DocTitleByStore'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Pagination, Spin } from 'antd'


const ListsPage = () => {
    const url = "http://localhost:9100"
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [lists, setLists] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    useEffect(() => {

        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : ''
        const _fetchMovies = async () => {

            setLoading(true)
            setError('')

            try {

                const res = await axios.get(`${url}/api/lists`, {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
                const { data } = res

                if (data.length) {
                    setLists(data)
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
    const currentMovies = lists.slice(index0fFirst, index0fLast)


    if (error) return <i className='text-danger fs-14'>{error}</i>
    return (
        <div className="ListPage">
            <DocTitleByStore title="Lists" />
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="PageTitle mt-2 mb-2">Lists</h1>
                <div className='col-auto ml-3 ml-sm-0 mr-3 mr-lg-0'>
                    <Link to="/lists/new" className="btn btn-primary">Add new list</Link>
                </div>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <div className="SectionInner">
                    {
                        !loading && lists.length > 0 &&
                        <div className="MoviesTable">
                            <div className="wrapTable">
                                <table className="table">
                                    <thead className="ShippingsTableHead">
                                        <tr>
                                            <th className="Supplier">Title</th>
                                            <th className="Zone">Genre</th>
                                            <th className="Store">Type</th>
                                            <th className="Product_title">Number of movies</th>
                                            <th className="Action">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lists.length && currentMovies.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>{item.genre}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.content.length}</td>
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
                                <Pagination current={page} total={lists.length} pageSize={limit} onChange={_handlePageChange}
                                    className='text-right' showSizeChanger pageSizeOptions={['10', '20', '50', '100']}
                                />
                            </div>
                        </div>
                    }
                    {
                        loading && <div>Loading...</div>
                    }

                    {
                        !loading && lists.length === 0 && <div>No result</div>
                    }


                </div>
            </Spin>
        </div>
    )
}

export default ListsPage