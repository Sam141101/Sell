import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import Announcement from '../components/Announcement';
import { Add, East, Remove, Reply } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState, useRef } from 'react';
// import { publicRequest } from '../requestMethods';
import { deleteProduct, getAllCart, updateProduct } from '../redux/apiCalls';

// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../redux/authRedux';
import { createAxios } from '../createInstance';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDelete from '../components/ConfirmDelete';

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 35px 50px 50px;
    ${mobile({
        padding: '10px',
    })}
`;
const Title = styled.h1`
    font-weight: 500;
    text-align: center;
    font-size: 30px;
    margin: 0 0 10px;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const Toptext = styled.p`
    margin: 0 0 10px 0;
    line-height: 21px;
    text-align: center;
`;

const TopTexts = styled.div`
    ${mobile({
        display: 'none',
    })}
`;
const TopText = styled.span`
    cursor: pointer;
    text-decoration: underline;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    ${mobile({
        flexDirection: 'column',
    })}
`;

const Info = styled.div`
    flex: 2.5;
    margin-right: 20px;
`;

const Product = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    ${mobile({
        flexDirection: 'column',
    })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    // width: 200px;
    width: 180px;
    margin: 20px 10px;
    cursor: pointer;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 20px;
`;

const ProductName = styled.span`
    font-size: 20px;
    font-weight: 600;
`;

const ProductId = styled.span`
    font-size: 15px;
    font-weight: 500;
`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
    font-size: 18px;
    font-weight: 500;
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    padding: 20px;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
`;
const ProductAmount = styled.div`
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 500;
    background: #ededed;
    border: 1px solid #dadbdd;
    border-radius: 0;
    width: 35px;
    height: 30px;
`;
const ProductPrice = styled.div`
    font-size: 28px;
    font-weight: 600;
    ${mobile({
        marginBottom: '20px',
    })}
`;

const Hr = styled.hr`
    background-color: #ededed;
    border: none;
    height: 2px;
    position: absolute;
    top: 100%;
    width: 100%;
`;

const Summary = styled.div`
    flex: 1;
    height: fit-content;
    border: 1px solid #e1e3e4;
    padding: 20px 20px 15px 20px;
    border-radius: 3px;
    // height: 50vh;
    margin-left: 20px;
`;

const SummaryTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
`;
const SummaryItem = styled.div`
    font-weight: ${(props) => props.type === 'total' && '500'};
    font-size: ${(props) => props.type === 'total' && '24px'};
`;
const SummaryItemText = styled.p`
    margin: 0 0 10px 0;
    line-height: 21px;
`;

const SummaryItemText1 = styled.div`
    font-size: 16px;
    color: #5c5c5c;
    font-weight: 600;
    padding: 15px 0;
    border-top: 1px dotted #dfe0e1;
    border-bottom: 1px dotted #dfe0e1;
    margin-bottom: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const SummaryItemPrice = styled.span`
    float: right;
    color: red;
    font-size: 24px;
`;
const Button = styled.button`
    text-transform: uppercase;
    width: 100%;
    background-color: #e00707;
    color: white;
    font-weight: 500;
    padding: 12px 10px;
    border: none;
    border-radius: 2px;
    font-size: 15px;
    cursor: pointer;
`;

const DeleteProduct = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        // background-color: #cccaca;
        // background-color: red;
        opacity: 0.7;
    }
`;

const Button1 = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const BtnAdd = styled.div`
    width: 30px;
    background: white;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dadbdd;
`;

const KeepShoping = styled.p`
    margin: 15px 0 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    background: #252a2b;
    display: block;
    width: 60px;
    height: 4px;
    margin: 25px auto 0;
`;

const Policy = styled.div`
    margin-top: 30px;
`;
const PolicyList = styled.ul`
    padding: 0;
    list-style-type: none;
`;
const PolicyItem = styled.li`
    display: flex;
    line-height: 25px;
    position: relative;
    padding-left: 20px;
    overflow: hidden;
    align-items: center;
`;
const PolicyTitle = styled.h4`
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 16px;
    color: #666666;
`;

const Cart = () => {
    const [confirm, setConfirm] = useState(false);
    const [noti, setNoti] = useState('none');

    const cart = useSelector((state) => state?.cart);
    const user = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleRemove = (id) => {
        deleteProduct(user.token, dispatch, id, axiosJWT);
    };

    const handleUpdown = (condition, id) => {
        console.log(condition, id, typeof id);
        let test = cart?.products.filter((item) => item._id === id);
        let getQuanti = test[0].quantity;
        let getPrice = test[0].product_id.price;
        // console.log(test);

        if (getQuanti === 1 && condition === 'add') {
            const quantiProduct = getQuanti + 1;
            const priceProduct = test[0].price + getPrice;
            const totalpriceProduct = cart.total + getPrice;
            const update = {
                quantiProduct: quantiProduct,
                priceProduct: priceProduct,
                totalpriceProduct: totalpriceProduct,
                condition: condition,
            };

            updateProduct(user.token, dispatch, id, update, condition);
        } else if (getQuanti === 1 && condition === 'minus') {
            // hiện 1 bảng xác nhận có xoá vật phẩm khỏi giỏ hàng không
            setNoti('block');
            if (confirm) {
                deleteProduct(user.token, dispatch, id);
            } else {
                // coi như ko có thay đổi gì
            }
        } else if (getQuanti > 1) {
            // thực hiện bình thường
            if (condition === 'minus') {
                const quantiProduct = getQuanti - 1;
                const priceProduct = test[0].price - getPrice;
                const totalpriceProduct = cart.total - getPrice;
                const update = {
                    quantiProduct: quantiProduct,
                    priceProduct: priceProduct,
                    totalpriceProduct: totalpriceProduct,
                    condition: condition,
                };
                updateProduct(user.token, dispatch, id, update, condition);
            } else if (condition === 'add') {
                const quantiProduct = getQuanti + 1;
                const priceProduct = test[0].price + getPrice;
                const totalpriceProduct = cart.total + getPrice;
                const update = {
                    quantiProduct: quantiProduct,
                    priceProduct: priceProduct,
                    totalpriceProduct: totalpriceProduct,
                    condition: condition,
                };
                console.log(update);
                updateProduct(user.token, dispatch, id, update, condition);
            }
        }
    };

    useEffect(() => {
        const getCart = () => {
            if (!user) {
                navigate('/login');
            }
            if (user?.token) {
                getAllCart(user.token, dispatch, user._id);
            }
        };
        getCart();
    }, [dispatch, user, navigate, confirm]);

    return (
        <Container>
            <Navbar />
            <Announcement />

            <Wrapper>
                <Title>Giỏ hàng của bạn</Title>
                <Toptext>Có {cart.quantity} sản phẩm trong giỏ hàng</Toptext>
                <Line></Line>
                {/* <Top>
                    <Link to="/products">
                    </Link>

                    <TopButton type="filled">Thanh Toán Ngay</TopButton>
                </Top> */}

                <Bottom>
                    <Info>
                        {cart.products?.map((product, index) => (
                            <Product key={index}>
                                {/* <ProductDetail>
                                    <ConfirmDelete
                                        id={product._id}
                                        noti={noti}
                                        setNoti={setNoti}
                                        name={product.product_id.title}
                                        token={user.token}
                                    />

                                    <Image src={product.product_id.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.product_id.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product.product_id._id}
                                        </ProductId>
                                        <ProductColor color={product.product_id.color} />
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>

                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add
                                            onClick={(e) =>
                                                handleUpdown('add', product._id)
                                            }
                                        />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove
                                            onClick={() =>
                                                handleUpdown('minus', product._id)
                                            }
                                        />
                                    </ProductAmountContainer>

                                    <ProductPrice>{product.price} đ</ProductPrice>
                                </PriceDetail>

                                <DeleteProduct onClick={() => handleRemove(product._id)}>
                                    <ClearIcon fontSize="large" />
                                </DeleteProduct> */}

                                <ProductDetail>
                                    <ConfirmDelete
                                        id={product._id}
                                        noti={noti}
                                        setNoti={setNoti}
                                        name={product.product_id.title}
                                        token={user.token}
                                    />

                                    <Image src={product.product_id.img} />
                                    <Details>
                                        <ProductName>
                                            {product.product_id.title}
                                        </ProductName>
                                        <ProductId>{product.product_id.price}₫</ProductId>
                                        <ProductSize>{product.size}</ProductSize>

                                        <ProductAmountContainer>
                                            <BtnAdd>
                                                <Add
                                                    style={{
                                                        fontSize: '18px',
                                                        color: '#abafb2',
                                                    }}
                                                    onClick={(e) =>
                                                        handleUpdown('add', product._id)
                                                    }
                                                />
                                            </BtnAdd>
                                            <ProductAmount>
                                                {product.quantity}
                                            </ProductAmount>
                                            <BtnAdd>
                                                <Remove
                                                    style={{
                                                        fontSize: '18px',
                                                        color: '#abafb2',
                                                    }}
                                                    onClick={() =>
                                                        handleUpdown('minus', product._id)
                                                    }
                                                />
                                            </BtnAdd>
                                        </ProductAmountContainer>
                                    </Details>
                                </ProductDetail>

                                <PriceDetail>
                                    <DeleteProduct
                                        onClick={() => handleRemove(product._id)}
                                    >
                                        <ClearIcon
                                            style={{
                                                fontSize: '30px',
                                            }}
                                        />
                                    </DeleteProduct>

                                    <ProductPrice>{product.price}₫</ProductPrice>
                                </PriceDetail>

                                <Hr />
                            </Product>
                        ))}
                    </Info>

                    <Summary>
                        <SummaryTitle>Thông tin đơn hàng</SummaryTitle>
                        <SummaryItem type="total">
                            <SummaryItemText1>
                                Tổng tiền:
                                <SummaryItemPrice>{cart.total}₫</SummaryItemPrice>
                            </SummaryItemText1>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>
                                Phí vận chuyển sẽ được tính ở trang thanh toán.
                                <br />
                                Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                            </SummaryItemText>
                        </SummaryItem>
                        <Link style={{ textDecoration: 'none' }} to="/order">
                            <Button>Thanh Toán</Button>
                        </Link>
                        <KeepShoping>
                            <Link
                                to="/products"
                                style={{ color: '#D1D1D1', textDecoration: 'none' }}
                            >
                                <Reply style={{ marginRight: '4px' }} />
                                Tiếp tục mua hàng
                            </Link>
                        </KeepShoping>
                    </Summary>
                </Bottom>

                <Policy>
                    <PolicyTitle>Chính sách mua hàng</PolicyTitle>
                    <PolicyList>
                        <PolicyItem>
                            <East style={{ marginRight: '5px' }} />
                            Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.
                        </PolicyItem>
                        <PolicyItem>
                            <East style={{ marginRight: '5px' }} />
                            Sản phẩm còn đủ tem mác, chưa qua sử dụng.
                        </PolicyItem>
                        <PolicyItem>
                            <East style={{ marginRight: '5px' }} />
                            Sản phẩm nguyên giá được đổi trong 30 ngày trên toàn hệ thống
                        </PolicyItem>
                        <PolicyItem>
                            <East style={{ marginRight: '5px' }} />
                            Sản phẩm sale chỉ hỗ trợ đổi size (nếu cửa hàng còn) trong 7
                            ngày trên toàn hệ thống.
                        </PolicyItem>
                    </PolicyList>
                </Policy>
            </Wrapper>

            <Footer />
        </Container>
    );
};

export default Cart;
