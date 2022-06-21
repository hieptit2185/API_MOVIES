import React, { useEffect, useState } from 'react'
import DocTitleByStore from '../../shared/DocTitleByStore'
import { Link } from 'react-router-dom'
import axios from 'axios'


const MoviesPage = () => {

    const url = "http://localhost:3100"
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [movies, setMovies] = useState([])

    useEffect(() => {

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

        _fetchMovies()
    }, [])

    if (error) return <i className='text-danger fs-14'>{error}</i>

    return (
        <div className="MoviesPage">
            <DocTitleByStore title="Movies" />
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="PageTitle mt-2 mb-2">ListMovies</h1>
                <div className='col-auto ml-3 ml-sm-0 mr-3 mr-lg-0'>
                    <Link to="/a/movies/new" className="btn btn-primary">Add new movies</Link>
                </div>
            </div>
            <div className="SectionInner">
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
                                    movies.length && movies.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.isSeries ? "Yes" : "No"}</td>
                                            <td>
                                                <img src={item.img} alt="" width="30" height="30" />
                                            </td>
                                            <td>Edit | Delete</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    loading && <div>Loading...</div>
                }

                {
                    !loading && movies.length === 0 && <div>No result</div>
                }

            </div>
        </div>
    )
}

export default MoviesPage