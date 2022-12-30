import React, { useState, useEffect } from 'react';
import { Close, Create, Person, ShoppingCart } from '@mui/icons-material';
import styled from 'styled-components';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Announcement from '../components/Announcement';
import Navbar from '../components/NavBar';
import app from '../firebase';
import { updateUser } from '../redux/apiCalls';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import Products from '../components/Products';
import Product from '../components/Product';
// import app from '../firebase'

const Container = styled.div`
    display: flex;
    padding: 30px 65px 0 65px;
    flex-direction: column;
`;

const Title = styled.h3`
    text-align: center;
    font-size: 30px;
`;
const TitleInfo = styled.p`
    margin: 10px 0;
    font-size: 14px;
    text-align: center;
    opacity: 0.66;
`;
const Line = styled.div`
    position: relative;
    text-align: center;
    padding: 0 0 30px 0;

    &::after {
        content: '';
        background: #252a2b;
        display: block;
        width: 60px;
        height: 4px;
        margin: 25px auto 0;
    }
`;
const TitleResults = styled.div`
    // margin-bottom: 30px;
`;

const TitleRelate = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 30px;
`;

const Container1 = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Similar = ({ cat }) => {
    const location = useLocation();
    // const cat = location.pathname.split('/')[2];
    const [products, setProducts] = useState([]);
    console.log(cat);
    // ----------- Pagination -------

    const [filterPage, setFilterPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        // limit: 12,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        setFilterPage(newPage);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/products?category=${cat}&page=${filterPage}`,
                );
                const { resultProducts, pagi } = res.data;
                setProducts(resultProducts);
                setPagination(pagi);
                console.log(resultProducts);
            } catch (err) {}
        };

        getProducts();
    }, [cat, filterPage]);

    return (
        <>
            <TitleRelate>SẢN PHẨM LIÊN QUAN</TitleRelate>
            <Container1>
                {products?.map((item) => (
                    <Product item={item} key={item._id} />
                ))}
            </Container1>

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
    );
};

export default Similar;
