import "./listItem.scss";
import {
	PlayArrow,
	Add,
	ThumbUpAltOutlined,
	ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	const [isLike, setIsLike] = useState(false);
	const [isDisLike, setIsDisLike] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	const url = "http://localhost:9100"

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get(`${url}/api/movies/find/${item}`, {
					headers: {
						token:
							"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
					},
				});
				setMovie(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMovie();
	}, [item]);

	const handleAddFavorite = async () => {
		setIsFavorite(!isFavorite)
		console.log(movie._id)
	}

	const handleLike =  () => {
		console.log(movie._id)
		setIsDisLike(false);
		setIsLike(!isLike);
	}

	const handleDisLike =  () => {
		setIsLike(false)
		setIsDisLike(!isDisLike);
	}

	return (
		<a>
			<div
				className="listItem"
				style={{ left: isHovered && index * 225 - 50 + index * 2.5, zIndex: 2 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={movie?.imgSm} alt="" />
				{movie.isVip &&
					<img src="https://www.constructionleadersclub.com/wp-content/uploads/2018/11/VIP.png" style={{ width: "40px", height: "40px", position: "absolute" }} />
				}
				{isHovered && (
					<>
						<video src={movie.trailer} autoPlay={true} loop />
						<div className="itemInfo">
							<div className="icons">
								<Link to={{ pathname: "/watch", movie: movie }}>
									<PlayArrow className="icon" />
								</Link>
								<Add className="icon" onClick={handleAddFavorite} style={{ backgroundColor: isFavorite ? "#d183eb" : "" }}/>
								<ThumbUpAltOutlined className="icon" onClick={handleLike} style={{ backgroundColor: isLike ? "#3535cf" : "" }} />
								<ThumbDownOutlined className="icon" onClick={handleDisLike} style={{ backgroundColor: isDisLike ? "#df1d1d" : "" }} />
							</div>
							<div className="itemInfoTop">
								<span>{movie.duration}</span>
								<span className="limit">+{movie.limit}</span>
								<span>{movie.year}</span>
							</div>
							<div className="desc">{movie.desc}</div>
							<div className="genre">{movie.genre}</div>
						</div>
					</>
				)}
			</div>
		</a>
	);
}
