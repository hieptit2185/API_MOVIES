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
import { Modal } from 'antd';

export default function ListItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	const [isLike, setIsLike] = useState(false);
	const [isDisLike, setIsDisLike] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const { favourites } = user
	const isAdd = favourites.some(i => i === item);
	const [isFavorite, setIsFavorite] = useState(isAdd);
	const [isModalVisible, setIsModalVisible] = useState(false);
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
		const check = isFavorite ? false : true;

		try {
			const { data } = await axios.put(`${url}/api/users/favorite/${user._id}`, {
				isFavorite: check,
				favorites: movie._id
			})

			localStorage.setItem("user", JSON.stringify({ ...data, accessToken: user.accessToken }))

		} catch (err) {
			console.log(err);
		}
	}

	const handleLike = () => {
		console.log(movie._id)
		setIsDisLike(false);
		setIsLike(!isLike);
	}

	const handleDisLike = () => {
		setIsLike(false)
		setIsDisLike(!isDisLike);
	}

	const showModal = () => {
		setIsModalVisible(true);
	}

	const handleBuy = async () => {

		try {
			const { data } = await axios.put(`${url}/api/users/checkout/${user._id}`, {
				price: 359,
				isMember: user.isMember
			})

			setIsModalVisible(false);
			localStorage.setItem("user", JSON.stringify({ ...data, accessToken: user.accessToken }))
			window.location.reload()

		} catch (error) {
			console.log(error);
		}
	}

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<a>
			<div
				className="listItem"
				style={{ left: isHovered && index * 225 - 50 + index * 2.5, zIndex: 2 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={movie?.imgSm} alt="" style={{ border: movie.isVip ? "2px solid yellow" : "" }} />
				{/* {movie.isVip &&
					<img src="https://www.constructionleadersclub.com/wp-content/uploads/2018/11/VIP.png" style={{ width: "40px", height: "40px", position: "absolute",left : "456px" }} />
				} */}
				{isHovered && (
					<>
						{(user.isMember || !movie.isVip) && <video src={movie.trailer} autoPlay={true} loop />}
						<div className="itemInfo">
							<div className="icons">
								{(user.isMember) ?
									(<Link to={{ pathname: "/watch", movie: movie }}>
										<PlayArrow className="icon" />
									</Link>) :
									movie.isVip ? (
										<a onClick={showModal}>
											<PlayArrow className="icon" />
										</a>
									) : (
										<Link to={{ pathname: "/watch", movie: movie }}>
											<PlayArrow className="icon" />
										</Link>
									)
								}
								<Add className="icon" onClick={handleAddFavorite} style={{ backgroundColor: isFavorite ? "#d183eb" : "" }} />
								<ThumbUpAltOutlined className="icon" onClick={handleLike} style={{ backgroundColor: isLike ? "#3535cf" : "" }} />
								<ThumbDownOutlined className="icon" onClick={handleDisLike} style={{ backgroundColor: isDisLike ? "#df1d1d" : "" }} />
							</div>
							<span style={{fontSize:"20px", fontWeight:"bold", color: "#ad3737", marginBottom : "10px"}}>{movie.title}</span>
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
				<Modal title="Chose one plan and watch everything on Netflix" visible={isModalVisible} onCancel={handleCancel} className="modalCheckout">
					<div className="itemType">
						<div className="headingType">
							<h3>Premium</h3>
							<div className="InfoPrice">
								<span className="Price">
									$359/month
								</span>
							</div>
						</div>
						<div className="types">
							<ul>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									HD avaliable
								</li>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									Ultra HD avaliable
								</li>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									Screens you can watch on at the same time
								</li>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									Watch on the laptop, TV, phone and tablet
								</li>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									Unlimited movies and TV shows
								</li>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									Cancel anytime
								</li>
								<li>
									<span class="Icon"><svg viewBox="0 0 18 14" fill="none" width="12"><path d="M6 11.17L1.83 6.99997L0.410004 8.40997L6 14L18 1.99997L16.59 0.589966L6 11.17Z" fill="currentcolor"></path></svg></span>
									First month free
								</li>
							</ul>
							<div className="actionCreate">
								<a onClick={handleBuy}>Buy now</a>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		</a>
	);
}
