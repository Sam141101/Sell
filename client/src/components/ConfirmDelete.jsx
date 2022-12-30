import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../redux/apiCalls';
import { useRef } from 'react';

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 600;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled.div`
    padding: 20px;
    background-color: #fff;
    width: 500px;
    max-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: visible;
`;

const Title = styled.h1`
    margin-top: 30px;
    font-weight: 500;
    color: #ee4d2d;
    font-size: 15px;
`;

const NameProduct = styled.div`
    margin-top: 30px;
    font-size: 13px;
`;

const WrapperButton = styled.div`
    display: flex;
    margin-top: 50px;
    align-items: center;
`;

const ButtonYes = styled.button`
    height: 40px;
    padding: 10px;
    flex: 1;
    outline: 0;
    color: white;
    border: 1px solid rgba(0, 0, 0, 0.09);
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    overflow: visible;
    background: #ee4d2d;
    font-size: 15px;
    cursor: pointer;
`;

const ButtonNo = styled.button`
    height: 40px;
    padding: 10px;
    flex: 1;
    outline: 0;
    background: #fff;
    color: #555;
    border: 1px solid rgba(0, 0, 0, 0.09);
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    overflow: visible;
    font-size: 15px;
    margin-left: 20px;
    cursor: pointer;
`;

const ConfirmDelete = ({ id, noti, setNoti, name, token }) => {
    const notiRef = useRef();

    const [confirm, setConfirm] = useState(false);

    const cart = useSelector((state) => state?.cart);
    const user = useSelector((state) => state.auth?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (type) => {
        console.log('type', type);

        if (type === 'yes') {
            deleteProduct(token, dispatch, id);
            setNoti('none');
        } else if (type === 'no') {
            setNoti('none');
        }

        // console.log('notifi', notifi);
        // console.log('noti', noti);

        // return noti;
    };

    // useEffect(() => {
    //     console.log('llllllll');
    // }, [noti]);

    return (
        // <Container style={{ display: `${notiRef.current}` }}>
        <Container style={{ display: noti }}>
            <Wrapper>
                <Title>Bạn chắc chắn muốn bỏ sản phẩm này ?</Title>

                <NameProduct>{name}</NameProduct>

                <WrapperButton>
                    <ButtonYes onClick={() => handleClick('yes')}>Có</ButtonYes>
                    <ButtonNo onClick={() => handleClick('no')}>Không</ButtonNo>
                </WrapperButton>
            </Wrapper>
        </Container>
    );
};

export default ConfirmDelete;
