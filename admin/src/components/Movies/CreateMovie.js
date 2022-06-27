import React, { useEffect, useState } from 'react'
import ReturnPage from '../../shared/ReturnPage'
import { storage } from "../../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"



const CreateMovie = () => {

    const [movie, setMovie] = useState(null)
    const [img, setImg] = useState(null)
    const [imgTitle, setImgTitle] = useState(null)
    const [imgSm, setImgSm] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null)
    const [uploaded, setUploaded] = useState(0)
    const [imgList, setImgList] = useState([])
    const imgListRef = ref(storage, "images/")


    const handleChange = (e) => {
        const value = e.target.value
        setMovie({ ...movie, [e.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const handleChangeFile = (e) => {
        const value = e.target.files[0]
        upload(value)
    }


    const upload = (field) => {

        if (field === null) return

        const imgRef = ref(storage, `images/${field.name + v4()}`)
        uploadBytes(imgRef, field).then((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        listAll(imgListRef).then(res => {
            res.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setImgList(prev => [...prev, url])
                })
            })
        })
    }, [])

    return (

        <div className="CreateMovie">
            <ReturnPage url="/movies" title="Back" />
            <h1 className="PageTitle mt-2 mb-2">New Movie</h1>
            <div className="SectionInner">
                <form className="addProductForm">
                    <div className="addProductItem">
                        <label>Image</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={handleChangeFile}
                        />
                    </div>
                    {/* <div className="addProductItem">
                        <label>Title image</label>
                        <input
                            type="file"
                            id="imgTitle"
                            name="imgTitle"
                            onChange={(e) => setImgTitle(e.target.files[0])}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Thumbnail image</label>
                        <input
                            type="file"
                            id="imgSm"
                            name="imgSm"
                            onChange={(e) => setImgSm(e.target.files[0])}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="John Wick"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="description"
                            name="desc"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Year</label>
                        <input
                            type="text"
                            placeholder="Year"
                            name="year"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Genre</label>
                        <input
                            type="text"
                            placeholder="Genre"
                            name="genre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Duration</label>
                        <input
                            type="text"
                            placeholder="Duration"
                            name="duration"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Limit</label>
                        <input
                            type="text"
                            placeholder="limit"
                            name="limit"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Is Series?</label>
                        <select name="isSeries" id="isSeries" onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <div className="addProductItem">
                        <label>Trailer</label>
                        <input
                            type="file"
                            name="trailer"
                            onChange={(e) => setTrailer(e.target.files[0])}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Video</label>
                        <input
                            type="file"
                            name="video"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </div>
                    {uploaded === 5 ? (
                        <button className="addProductButton" onClick={handleSubmit}>
                            Create
                        </button>
                    ) : (
                        <button className="addProductButton" onClick={handleUpload}>
                            Upload
                        </button>
                    )} */}
                </form>
            </div>
        </div>
    )
}

export default CreateMovie