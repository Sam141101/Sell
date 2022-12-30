import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';

const Container = styled.div``;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({
        width: '0px 20px',
        display: 'flex',
        flexDirection: 'column',
    })}
`;

const FilterText = styled.span`
    font-size: 20px;
    margin-right: 20px;
    font-weight: 600;
    ${mobile({
        marginRight: '0px',
    })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({
        margin: '10px 0px',
    })}
`;

const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    console.log(filters);

    // ----------- Pagination --------
    // const [filterPage, setFilterPage] = useState({
    //     // limit: 10,
    //     page: 1,
    // });

    const [filterPage, setFilterPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        // limit: 12,
        totalRows: 20,
    });

    const handlePageChange = (newPage) => {
        // setFilterPage({
        //     page: newPage,
        // });
        setFilterPage(newPage);
    };

    // ----------------

    return (
        <Container>
            <NavBar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Kiểu sản phẩm:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option>WHITE</Option>
                        <Option>BLACK</Option>
                        <Option>GREEN</Option>
                        <Option>BLUE</Option>
                        <Option>NAVY</Option>
                        <Option>BROWN</Option>
                    </Select>

                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        {/* <Option>XL</Option> */}
                    </Select>
                </Filter>

                <Filter>
                    <FilterText>Sắp xếp sản phẩm:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">mới nhất</Option>
                        <Option value="asc">Giá tăng dần</Option>
                        <Option value="desc">Giá giảm dần</Option>
                    </Select>
                </Filter>
            </FilterContainer>

            <Products
                cat={cat}
                filters={filters}
                sort={sort}
                filterPage={filterPage}
                setPagination={setPagination}
                pagination={pagination}
            />

            <Pagination pagination={pagination} onPageChange={handlePageChange} />

            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;
