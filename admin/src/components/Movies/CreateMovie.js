import React, { useState } from 'react'
import ReturnPage from '../../shared/ReturnPage'
import { storage } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from 'axios'
import { Button, Input, Select, message, Spin } from 'antd'


const CreateMovie = () => {

    const url = "http://localhost:9100"
    const navigate = useNavigate()
    const [payload, setPayload] = useState(null)
    const [img, setImg] = useState(null)
    const [imgTitle, setImgTitle] = useState(null)
    const [imgSm, setImgSm] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setPayload({ ...payload, [e.target.name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accessToken : ''
        setLoading(true)

        try {
            const res = await axios.post(`${url}/api/movies`,
                {
                    ...payload, img, imgTitle, imgSm, trailer, video,
                },
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                },
            )

            if (!res.data) return message.error('Unknown error.')

            message.success('Create moview success!!')
            navigate("/movies")

        } catch (e) {
            console.log(e.message || 'Unknown error.')
        } finally {
            setLoading(false)
        }

    }

    const upload = (field, set) => {

        const imgRef = ref(storage, `images/${field.name + v4()}`)
        uploadBytes(imgRef, field).then((res) => {
            getDownloadURL(res.ref).then(url => {
                set(url)
            })
        })
    }

    return (

        <div className="CreateMovie">
            <ReturnPage url="/movies" title="Back" />
            <h1 className="PageTitle mt-2 mb-2">New Movie</h1>
            <div className="SectionInner">
                <form className="addProductForm d-flex flex-wrap">
                    <div className="addProductItem">
                        <label>Image<span className='text-danger'>*</span></label>
                        <Input
                            type="file"
                            id="img"
                            name="img"
                            onChange={e => upload(e.target.files[0], setImg)}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Title image<span className='text-danger'>*</span></label>
                        <Input
                            type="file"
                            id="imgTitle"
                            name="imgTitle"
                            onChange={e => upload(e.target.files[0], setImgTitle)}

                        />
                    </div>
                    <div className="addProductItem">
                        <label>Thumbnail image<span className='text-danger'>*</span></label>
                        <Input
                            type="file"
                            id="imgSm"
                            name="imgSm"
                            onChange={e => upload(e.target.files[0], setImgSm)}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Title<span className='text-danger'>*</span></label>
                        <Input
                            type="text"
                            placeholder="John Wick"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Is Series?<span className='text-danger'>*</span></label>
                        <Select name="isSeries" id="isSeries" onChange={handleChange}>
                            <Select.Option value="false">No</Select.Option>
                            <Select.Option value="true">Yes</Select.Option>
                        </Select>
                    </div>
                    <div className="addProductItem">
                        <label>Year<span className='text-danger'>*</span></label>
                        <Input
                            type="text"
                            placeholder="Year"
                            name="year"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Genre<span className='text-danger'>*</span></label>
                        <Input
                            type="text"
                            placeholder="Genre"
                            name="genre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Duration<span className='text-danger'>*</span></label>
                        <Input
                            type="text"
                            placeholder="Duration"
                            name="duration"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Limit<span className='text-danger'>*</span></label>
                        <Input
                            type="text"
                            placeholder="limit"
                            name="Limit"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Description<span className='text-danger'>*</span></label>
                        <Input.TextArea
                            type="text"
                            placeholder="Description"
                            name="desc"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Trailer<span className='text-danger'>*</span></label>
                        <Input
                            type="file"
                            name="trailer"
                            onChange={e => upload(e.target.files[0], setTrailer)}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Video<span className='text-danger'>*</span></label>
                        <Input
                            type="file"
                            name="video"
                            onChange={e => upload(e.target.files[0], setVideo)}
                        />
                    </div>
                    <Button type="primary mx-3" onClick={handleSubmit}>
                        Create {loading ? <Spin /> : ''}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateMovie