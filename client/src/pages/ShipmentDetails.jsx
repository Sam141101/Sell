import styled from 'styled-components';
// import { Add, Details, East, Remove, Reply } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { async } from '@firebase/util';

const Container = styled.div`
    padding: 0 5%;
    margin: 0 120px;
    display: flex;
    width: 90%;
`;
const ContainerLeft = styled.div`
    width: 52%;
    padding-right: 6%;
    padding-top: 56px;
`;
const Title = styled.div`
    font-size: 26px;
    font-weight: 500;
`;

const TextTitle = styled.div`
    margin-top: 15px;
    font-size: 18px;
    font-weight: 400;
`;
const Details = styled.div``;
const User = styled.div`
    display: flex;
    align-items: center;
    margin-left: 7px;
`;
const UserImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 15px;
`;
const UserBlock = styled.div``;
const UserText = styled.div`
    color: #737373;
    font-size: 15px;
`;
const LogoutUser = styled.div`
    color: #338dbc;
    font-size: 14px;
    font-weight: 500;

    &:hover {
        color: #2b78a0;
        filter: brightness(1.2);
    }
`;
const AddInfo = styled.div`
    margin-top: 25px;
`;
const InfoUser = styled.input`
    width: 90%;
    padding: 12px 10px;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 5px;
    font-size: 15px;
    margin-bottom: 15px;
`;
const PaymentMethod = styled.div`
    margin-top: 25px;
    font-size: 15px;
`;
const FormKey = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
`;
const FormValue = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    // background: red;
    border-radius: 10px;
    border: 1px solid #ccc;
`;
const BlockPayment = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 5px;
`;

const FormValueSelect = styled.input`
    margin-right: 12px;
`;
const FormValueLabel = styled.label``;
const BlockButton = styled.div`
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    font-size: 15px;
`;
const Cart = styled.div`
    color: #338dbc;
    font-weight: 500;

    &:hover {
        color: #2b78a0;
        filter: brightness(1.2);
    }
`;

const Finished = styled.button`
    display: inline-block;
    border-radius: 4px;
    font-weight: 500;
    font-size: 15px;
    padding: 17px 24px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    background: #338dbc;
    color: white;
    border: none;
`;

const ContainerRight = styled.div`
    width: 38%;
    padding-top: 56px;
    padding-left: 4%;
    border-left: 1px solid #ccc;
`;

const ProductList = styled.div`
    border-bottom: 1px solid;
    border-color: #e1e1e1;
    padding-bottom: 15px;
`;
const DetailsProduct = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    position: relative;
`;
const Img = styled.img`
    width: 65px;
    height: 65px;
    border-radius: 5px;
    margin-right: 15px;
`;
const InfoProduct = styled.div``;
const Name = styled.div`
    font-weight: 500;
`;
const Price = styled.div``;
const Size = styled.div`
    opacity: 0.7;
`;

const Quanti = styled.div`
    font-size: 12px;
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    background: #949393;
    top: -8px;
    left: 55px;
    z-index: 1;
    align-items: center;
    color: white;
    justify-content: center;
`;
const TotalSum = styled.div`
    padding: 20px 0;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const TextSum = styled.div`
    font-weight: 600;
    font-size: 18px;
`;
const TextPrice = styled.div`
    display: flex;
    align-items: center;
    color: #979696;
`;
const NumberPrice = styled.div`
    font-size: 25px;
    font-weight: 500;
    margin-left: 10px;
    color: black;
`;

const ShipmentDetails = () => {
    const user = useSelector((state) => state.auth?.currentUser);
    const cart = useSelector((state) => state.cart?.products);
    const total = useSelector((state) => state?.cart);
    const [inputs, setInputs] = useState({});
    const [product, setProduct] = useState({});
    const userId = user._id;
    const totalPrice = total.total;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    console.log(cart);

    const handleFinishClick = async () => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/orders/',
                { inputs, cart, userId, totalPrice },
                {
                    headers: { token: `Bearer ${user.token}` },
                },
            );
            navigate('/ttt');
        } catch (e) {}
    };

    return (
        <Container>
            <ContainerLeft>
                <Link style={{ color: '#000', textDecoration: 'none' }} to="/">
                    <Title>Outerity</Title>
                </Link>
                <TextTitle>Thông tin giao hàng</TextTitle>
                <Details>
                    <User>
                        <UserImg src={user.img} alt="" />
                        <UserBlock>
                            <UserText>
                                {user.username} ({user.email})
                            </UserText>
                            <Link style={{ textDecoration: 'none' }} to="/logout">
                                <LogoutUser>Đăng xuất</LogoutUser>
                            </Link>
                        </UserBlock>
                    </User>

                    <AddInfo>
                        <InfoUser
                            type="text"
                            name="address"
                            onChange={handleChange}
                            placeholder="Thêm địa chỉ mới"
                        />
                        <InfoUser
                            type="text"
                            name="fullname"
                            onChange={handleChange}
                            placeholder="Họ và tên"
                        />
                        <InfoUser
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            placeholder="Số điện thoại"
                        />
                    </AddInfo>

                    <PaymentMethod>
                        <FormKey>Phương thức thanh toán</FormKey>
                        <FormValue>
                            <BlockPayment onChange={handleChange}>
                                <FormValueSelect
                                    type="radio"
                                    name="method"
                                    id="receive"
                                    value="receive"
                                />
                                <FormValueLabel htmlFor="receive">
                                    Thanh toán khi giao hàng
                                </FormValueLabel>
                                {/* <FormValueLabel htmlFor="momo">
                                    Thanh toán bằng Ví MoMo
                                </FormValueLabel>
                                <FormValueSelect
                                    type="radio"
                                    name="gender"
                                    id="momo"
                                    value="momo"
                                /> */}
                            </BlockPayment>

                            <BlockPayment onChange={handleChange}>
                                <FormValueSelect
                                    type="radio"
                                    name="method"
                                    id="momo"
                                    value="momo"
                                />
                                <FormValueLabel htmlFor="momo">
                                    Thanh toán bằng Ví MoMo
                                </FormValueLabel>
                            </BlockPayment>
                        </FormValue>
                    </PaymentMethod>

                    <BlockButton>
                        <Link style={{ textDecoration: 'none' }} to="/cart">
                            <Cart>Giỏ hàng</Cart>
                        </Link>
                        <Finished onClick={handleFinishClick}>Hoàn tất đơn hàng</Finished>
                    </BlockButton>
                </Details>
            </ContainerLeft>

            <ContainerRight>
                <ProductList>
                    {cart?.map((item, index) => (
                        <DetailsProduct key={index} quanti={item.quantity}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Img src={item.product_id.img} alt="" />
                                <InfoProduct>
                                    <Name>{item.product_id.title}</Name>
                                    <Size>{item.size}</Size>
                                    <Quanti>{item.quantity}</Quanti>
                                </InfoProduct>
                            </div>

                            <Price>{item.price}₫</Price>
                        </DetailsProduct>
                    ))}
                </ProductList>

                <TotalSum>
                    <TextSum>Tổng cộng</TextSum>
                    <TextPrice>
                        VND <NumberPrice>{total.total}₫</NumberPrice>
                    </TextPrice>
                </TotalSum>
            </ContainerRight>
        </Container>
    );
};

export default ShipmentDetails;
