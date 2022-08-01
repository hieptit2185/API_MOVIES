import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../navbar/Navbar'
import axios from "axios";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import ListItem from '../listItem/ListItem'
import List from "../list/List";

import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@material-ui/icons";

const VipMovie = () => {
    const [content, setContent] = useState({});
    const [isMoved, setIsMoved] = useState(false);
    const [listVip, setListVip] = useState([])
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
    const user = JSON.parse(localStorage.getItem('user'));
    const url = "http://localhost:9100"
    const listRef = useRef();

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

    const getListVip = async () => {
        try {
            const { data } = await axios.get(`${url}/api/movies`, {
                headers: {
                    token:
                        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
            });
            const filterVip = data.filter(vip => vip.isVip)
            setListVip(filterVip);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getRandomContent();
        getListVip()
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
                            <span>Play</span>
                        </button>
                        <button className="more">
                            <InfoOutlined />
                            <span>Info</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="list">
                <span className="listTitle">Vip movies</span>
                <div className="wrapper">
                    <ArrowBackIosOutlined
                        className="sliderArrow left"
                        onClick={() => handleClick("left")}
                        style={{ display: !isMoved && "none" }}
                    />
                    <div className="container" ref={listRef}>
                        {listVip.map((list, i) => (
                            <ListItem index={i} item={list._id} />
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

export default VipMovie