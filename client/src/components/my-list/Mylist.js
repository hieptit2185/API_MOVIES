import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../navbar/Navbar'
import axios from "axios";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import ListItem from '../listItem/ListItem'
import { Link } from "react-router-dom";
import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@material-ui/icons";


const Mylist = () => {
    const [content, setContent] = useState({});
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
    const user = JSON.parse(localStorage.getItem('user'));
    const url = "http://localhost:9100"
    const listRef = useRef();

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`${url}/api/movies/random`, {
                    headers: {
                        token:
                            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                });
                setContent(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomContent();
    }, []);

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 10 - clickLimit) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };

    return (
        <div className="home">
            <Navbar />

            <div className="featured">
                <img src={content.img} alt="" />
                <div className="info">
                    <img src={content.imgTitle} alt="" />
                    <span className="desc">{content.desc}</span>
                    <div className="buttons">
                        <button className="play">
                            <PlayArrow />
                            <Link to={{ pathname: "/watch", movie: content }}>
                                <span>Play</span>
                            </Link>
                        </button>
                        <button className="more">
                            <InfoOutlined />
                            <span>Info</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="list">
                <span className="listTitle">List favourites</span>
                <div className="wrapper">
                    <ArrowBackIosOutlined
                        className="sliderArrow left"
                        onClick={() => handleClick("left")}
                        style={{ display: !isMoved && "none" }}
                    />
                    <div className="container" ref={listRef}>
                        {user.favourites.map((item, i) => (
                            <ListItem index={i} item={item} />
                        ))}
                    </div>
                    <ArrowForwardIosOutlined
                        className="sliderArrow right"
                        onClick={() => handleClick("right")}
                    />
                </div>
            </div>
        </div>
    )
}

export default Mylist