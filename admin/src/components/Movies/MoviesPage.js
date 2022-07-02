import React, { useEffect, useState } from 'react'
import DocTitleByStore from '../../shared/DocTitleByStore'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Pagination, message, Spin } from 'antd'
import './Movie.css'


const MoviesPage = () => {

    const url = "http://localhost:9100"
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : ''

    const _fetchMovies = async () => {

        setLoading(true)
        setError('')

        try {

            const res = await axios.get(`${url}/api/movies`, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            const { data } = res

            if (data.length) {
                setMovies(data)
            }
            setLoading(false)
        } catch (e) {
            setError(e.message || 'Unknown error.')
        }
    }

    const handleDelete = async (id) => {
        setLoading(true)
        setError('')

        try {
            const res = await axios.delete(`${url}/api/movies/${id}`, {
                headers: {
                    token: `Bearer ${token}`
                }
            })

            if (!res) return message.error('Delete failed.')
            message.success('Delete movie success!!')
            _fetchMovies()

        } catch (e) {
            setError(e.message || 'Unknown error.')
        } finally {
            setLoading(false)
        }
    }

    const _handlePageChange = (page, limit) => {
        setLimit(limit)
        setPage(page)
    }

    useEffect(() => {
        _fetchMovies()
    }, [])

    const index0fLast = page * limit
    const index0fFirst = index0fLast - limit
    const currentMovies = movies.slice(index0fFirst, index0fLast)


    if (error) return <i className='text-danger fs-14'>{error}</i>

    return (
        <div className="MoviesPage">
            <DocTitleByStore title="Movies" />
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="PageTitle mt-2 mb-2">List Movies</h1>
                <div className='col-auto ml-3 ml-sm-0 mr-3 mr-lg-0'>
                    <Link to="/movies/new" className="btn btn-primary">Add new movies</Link>
                </div>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <div className="SectionInner">
                    {
                        !loading && movies.length > 0 &&
                        <div className="MoviesTable">
                            <div className="wrapTable">
                                <table className="table">
                                    <thead className="ShippingsTableHead">
                                        <tr>
                                            <th className="Supplier">Title</th>
                                            <th className="Shipping_plan">Description</th>
                                            <th className="Zone">Genre</th>
                                            <th className="Store">Serise</th>
                                            <th className="Product_title">Image</th>
                                            <th className="Action">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            movies.length && currentMovies.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>{item.desc}</td>
                                                    <td>{item.genre}</td>
                                                    <td>{item.isSeries ? "Yes" : "No"}</td>
                                                    <td>
                                                        <img src={item.img} alt="" width="30" height="30" />
                                                    </td>
                                                    <td>
                                                        <span className="text-primary px-1" style={{ cursor: "pointer" }}>Edit</span>|
                                                        <span className="text-danger px-1" onClick={() => handleDelete(item._id)} style={{ cursor: "pointer" }}>Delete</span>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="Pagination d-flex justify-content-between">
                                <div></div>
                                <Pagination current={page} total={movies.length} pageSize={limit} onChange={_handlePageChange}
                                    className='text-right' showSizeChanger pageSizeOptions={['10', '20', '50', '100']}
                                />
                            </div>
                        </div>
                    }
                    {
                        loading && <div>Loading...</div>
                    }

                    {
                        !loading && movies.length === 0 && <div>No result</div>
                    }


                </div>
            </Spin>
        </div>
    )
}

export default MoviesPage