import React, { useState, useEffect } from 'react';
import { Close, RotateRight, Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';

import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import useDebounce from '../hooks/useDebounce';

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

    color: ${(props) => props.searchValue};

    &:disabled {
        // opacity: 0.7;
        cursor: not-allowed;
    }
`;

const ListSearch = styled.div`
    background: #fff;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 8%);
    border-top: none !important;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    cursor: pointer;
    z-index: 5;
`;

const ItemSearch = styled.div`
    padding: 10px 10px;
    border-bottom: 1px dotted #dfe0e1;
    clear: both;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }
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

const ButtonClose = styled.div`
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    padding: 2px;
    background: #d1d1d1;
    border-radius: 50%;
    color: #393838;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const Searchs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --------------- Phần search --------------------
    const inputRef = useRef();

    const [searchTerm, setSearchTerm] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [showResult, setShowResult] = useState(true);
    // const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchTerm, 600);

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`/search/${debounced}`);
        setSearchTerm('');
    };

    const handleClick = (product) => {
        navigate(`/product/${product._id}`);
    };

    useEffect(() => {
        const showProduct = async () => {
            try {
                if (!debounced.trim()) {
                    setListProduct([]);
                    return;
                }
                // setLoading(true);
                const res = await axios.get(
                    // 'http://localhost:5000/api/search?search=' + searchTerm,
                    `http://localhost:5000/api/search?search=${encodeURIComponent(
                        debounced,
                    )}`,
                );
                setListProduct(res.data);
                // setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        showProduct();
    }, [debounced]);

    return (
        // <div
        //     onBlur={() => {
        //         setShowResult(false);
        //     }}
        // >
        <SearchContainer
        // onBlur={() => {
        //     setShowResult(false);
        // }}

        // onFocusOut={() => {
        //     setShowResult(false);
        // }}
        >
            <Input
                ref={inputRef}
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                id="search"
                onFocus={() => setShowResult(true)}
            />

            {!!searchTerm && (
                <ButtonClose
                    onClick={() => {
                        setSearchTerm('');
                        inputRef.current.focus();
                    }}
                >
                    <Close style={{ fontSize: '11px' }} />
                </ButtonClose>
            )}

            {/* {loading && (
                <ButtonClose
                    onClick={() => {
                        setSearchTerm('');
                        inputRef.current.focus();
                    }}
                >
                    <RotateRight style={{ fontSize: '11px',
                 }} />
                </ButtonClose>
            )} */}

            <Button
                disabled={!searchTerm}
                id="button"
                onClick={handleSubmit}
                searchValue={searchTerm ? '#393838' : 'white'}
            >
                <Search fontSize="large" />
            </Button>

            {showResult && searchTerm.length > 0 && (
                <ListSearch>
                    {listProduct?.map((product, index) => (
                        <ItemSearch key={index} onClick={() => handleClick(product)}>
                            <Item>
                                <ItemTitle>
                                    <ItemName>{product.title}</ItemName>
                                    <ItemPrice>{product.price}₫</ItemPrice>
                                </ItemTitle>
                            </Item>
                            <ItemImg src={product.img} />
                        </ItemSearch>
                    ))}
                </ListSearch>
            )}
        </SearchContainer>
        // </div>
    );
};

export default Searchs;

// <SearchContainer>
//                         <Input
//                             placeholder="Tìm kiếm sản phẩm..."
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             value={searchTerm}
//                             id="search"
//                         />

//                         <Close />

//                         <Button id="button" onClick={handleSubmit}>
//                             <Search fontSize="large" />
//                         </Button>

//                         <ListSearch>
//                             {listProduct?.map((product, index) => (
//                                 <ItemSearch key={index}>
//                                     <Item>
//                                         <ItemTitle>
//                                             <ItemName>{product.title}</ItemName>
//                                             <ItemPrice>{product.price}₫</ItemPrice>
//                                         </ItemTitle>
//                                     </Item>
//                                     <ItemImg src={product.img} />
//                                 </ItemSearch>
//                             ))}
//                         </ListSearch>
//                     </SearchContainer>
