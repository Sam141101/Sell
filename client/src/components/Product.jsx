import {
    FavoriteBorder,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``

// const Product = ({ item }) => {
//     const SoldOut = true;

//     return (
//         <div>
//             <div className={cx('wrapper')}>
//                 <div className={cx('product-img')}>
//                     {SoldOut ? (
//                         <div className={cx('sold-out')}>
//                             <span>Hết hàng</span>
//                         </div>
//                     ) : (
//                         <div className={cx('product-sale')}>
//                             {/* <span>-38%</span> */}
//                             <span>{data.sale}</span>
//                         </div>
//                     )}

//                     <Button to={data.to} className={cx('product-img-height')}>
//                         <Image src={data.img} className={cx('img-loop')} />
//                     </Button>
//                 </div>

//                 <div className={cx('product-detail')}>
//                     <div className={cx('box-pro-detail')}>
//                         <h3 className={cx('pro-name')}>
//                             <Button to={data.to} className={cx('pro-name-link')}>
//                                 {data.content}
//                             </Button>
//                         </h3>

//                         <div className={cx('box-pro-prices')}>
//                             <p className={cx('pro-price')}>
//                                 <span className={cx('highlight')}>{data.price}</span>
//                                 <span className={cx('pro-price-del')}>
//                                     <del>{data.discount}</del>
//                                 </span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 290px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({ item }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>

                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>

                <Icon>
                    <FavoriteBorder />
                </Icon>
            </Info>
        </Container>
    );
};
export default Product;
