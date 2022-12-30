import React, { useState, useEffect } from 'react';
import { Close, Search, ShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';

import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCart, logout } from '../redux/apiCalls';
import { createAxios } from '../createInstance';
import { loginSuccess, logoutSuccess } from '../redux/authRedux';
import axios from 'axios';
import Searchs from './Searchs';

const Container = styled.div`
    height: 64px;
    ${mobile({
        height: '50px',
    })}
`;

const Wrapper = styled.div`
    padding: 12px 30px;
    display: flex;
    justify-content: space-between;
    ${mobile({
        padding: '10px 0px',
    })}
`;

// Left
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
        display: 'none',
    })}
`;

const SearchContainer = styled.div`
    // border: 0.5px solid lightgray;
    // display: flex;
    // align-items: center;
    // margin-left: 25px;
    // padding: 5px;

    width: 70%;
    display: flex;
    position: relative;
    height: 40px;
`;

const Input = styled.input`
    padding: 10px 50px 9px 10px;
    width: 100%;
    background: #fff;
    border: 1px solid #ececec;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    display: inline-block;
    border-radius: 4px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    -webkit-transition: all 150ms linear;
    transition: all 150ms linear;

    ::placeholder {
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    &:focus-within {
        background: #ffffff;
        outline: none;
        border-color: #d1d1d1;
    }
`;

const Button = styled.button`
    position: absolute;
    padding: 0;
    top: 0px;
    bottom: 0;
    right: 0px;
    border-radius: 0 4px 4px 0;
    border: 0;
    width: 50px;
    background: #d1d1d1;
    transition: opacity 150ms linear;
    cursor: pointer;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

// Center
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// const Logo = styled.h1`
//     font-weight: bold;
//     ${mobile({
//         fontSize: '24px',
//     })}
// `;

// Right
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
        flex: 2,
        justifyContent: 'center',
    })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cussor: pointer;
    margin-left: 25px;
    ${mobile({
        fontSize: '12px',
        marginLeft: '10px',
    })}
`;

const ImgAvatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 20px;
`;

const UserName = styled.span`
    font-size: 15px;
    margin-left: 8px;
    font-weight: 500;
`;

const LogOut = styled.span`
    font-size: 14px;
    margin-left: 20px;
`;

const Form = styled.form`
    display: flex;
`;

const ListSearch = styled.div`
    background: #fff;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 8%);
    border-top: none !important;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 3;
`;

const ItemSearch = styled.div`
    padding: 10px 10px;
    border-bottom: 1px dotted #dfe0e1;
    clear: both;
    display: flex;
    align-items: center;
`;
const Item = styled.div`
    width: calc(100% - 40px);
    padding-right: 5px;
    float: left;
    line-height: 20px;
    position: relative;
    margin-top: 0px !important;
`;
const ItemTitle = styled.div``;
const ItemName = styled.div``;
const ItemPrice = styled.p`
    line-height: 15px;
    font-size: 12px;
    font-weight: 600;
    float: left;
    margin: 0;
`;
const ItemImg = styled.img`
    width: 40px;
    display: inline-block;
    text-align: right;
    padding: 0;
    max-width: 100%;
    vertical-align: middle;
    object-fit: cover;
`;

const ListInfo = styled.div`
    background-color: #e7e7e7;
    width: 150px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 3px;
    z-index: 4;
    position: absolute;
    right: 0;
    top: 130%;
    display: none;

    &::before {
        content: '';
        display: block;
        width: 0px;
        height: 0px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #e7e7e7;
        position: absolute;
        top: -8px;
        right: 20px;
    }
`;

const UserImg = styled.div`
    display: flex;
    align-items: center;
`;

const User = styled.div`
    position: relative;

    &::before {
        content: '';
        display: block;
        width: 88%;
        height: 16px;
        position: absolute;
        background: transparent;
        top: 88%;
        right: 0px;
    }

    &:hover ${ListInfo} {
        display: block;
    }
`;

const InfoUser = styled.div`
    padding-top: ;
    transition: all 0.3s;
    padding: 10px 12px 10px 12px;
    cursor: pointer;

    &:hover {
        background-color: #b4b3b3;
    }
`;

const HeaderImg = styled.img`
    height: 32px;
    cursor: pointer;
`;

const Navbar = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const quantity = useSelector((state) => state.cart?.quantity);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = user?.token;
    const id = user?._id;

    const handleClick = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
        } else {
            navigate('/cart');
        }
    };

    // Logout
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch, navigate, id, accessToken, axiosJWT);
    };

    // profile user
    const profileUser = (e) => {
        e.preventDefault();
        navigate('/account/profile');
    };

    // useEffect(() => {
    //     const getCart = () => {
    //         if (user) {
    //             getAllCart(user.token, dispatch, user._id);
    //         }
    //     };
    //     getCart();
    // }, [dispatch, user]);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Searchs />
                </Left>

                <Center>
                    <Link to="/">
                        <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                    </Link>
                </Center>
                <Right>
                    {user ? (
                        <>
                            {/* <UserName>Hi {user.username}</UserName> */}
                            <User>
                                <UserImg>
                                    <ImgAvatar
                                        src={
                                            user.img ||
                                            'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
                                        }
                                        alt=""
                                        className="topAvatar"
                                    />
                                    <UserName>{user.username}</UserName>
                                </UserImg>
                                <ListInfo>
                                    <InfoUser
                                        style={{
                                            borderTopLeftRadius: '3px',
                                            borderTopRightRadius: '3px',
                                        }}
                                        onClick={profileUser}
                                    >
                                        Tài khoản của tôi
                                    </InfoUser>
                                    <InfoUser
                                        style={{
                                            borderBottomLeftRadius: '3px',
                                            borderBottomRightRadius: '3px',
                                        }}
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </InfoUser>
                                </ListInfo>
                            </User>
                            {/* <LogOut to="/logout" onClick={handleLogout}>
                                LogOut
                            </LogOut> */}
                        </>
                    ) : (
                        <>
                            <Link
                                // to="/register"
                                to="/confirm/register"
                                style={{ color: '#000', textDecoration: 'none' }}
                            >
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link
                                to="/login"
                                style={{ color: '#000', textDecoration: 'none' }}
                            >
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </>
                    )}
                    {/* <Link to="/cart" onClick={handleClick}> */}
                    <Link onClick={handleClick}>
                        <MenuItem>
                            <Badge badgeContent={user && quantity} color="secondary">
                                <ShoppingCart fontSize="large" />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;

// --------------- Phần search --------------------
// const [searchTerm, setSearchTerm] = useState('');
// const [listProduct, setListProduct] = useState([]);

// const handleSubmit = (e) => {
//     e.preventDefault();

//     setSearchTerm('');
// };

// useEffect(() => {
//     const showProduct = async () => {
//         try {
//             const res = await axios.get(
//                 'http://localhost:5000/api/search?search=' + searchTerm,
//             );
//             setListProduct(res.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     showProduct();
// }, [searchTerm]);

// ----------------------------------------------------------------
