import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { Input, Modal } from 'antd';
import axios from "axios";



const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const user = JSON.parse(localStorage.getItem('user'))
    const url = "http://localhost:9100"

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const { data } = await axios.put(`${url}/api/users/total/${user._id}`, {
                total: +value
            });
            localStorage.setItem("user", JSON.stringify({...data, accessToken: user.accessToken}));
            setIsModalVisible(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;

        if(+inputValue < 0) return
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            setValue(inputValue);
        }
    };

    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarmainLinks">Movies</span>
                    </Link>
                    <Link to="/vip" className="link">
                        <span className="navbarmainLinks">Vip</span>
                    </Link>
                    <Link to="/my-favorites" className="link">
                        <span className="navbarmainLinks">My Favorites</span>
                    </Link>
                </div>
                <div className="right">
                    {/* <Search className="icon" /> */}
                    <span>{user.username.toUpperCase()}</span>
                    <span style={{ margin: "0 20px" }}>Money: <span style={{ fontWeight: "bold" }}>{user.total ? numberWithCommas(user.total) : 0}$</span></span>
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span onClick={showModal}>Add money</span>
                            <span onClick={() => dispatch(logout())}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Add money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label style={{marginBottom : '10px', display : 'block'}} htmlFor="">Money($)</label>
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Amount"
                    maxLength={3}
                />
            </Modal>
        </div>
    );
};

export default Navbar;
