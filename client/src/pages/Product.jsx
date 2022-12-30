import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { publicRequest } from '../requestMethods';
// import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/apiCalls';
// import axios from 'axios';
// import Pagination from '../components/Pagination';
import Similar from '../components/Similar';
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 30px 85px;
    display: flex;
    ${mobile({
        padding: '10px',
        flexDirection: 'column',
    })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({
        height: '40vh',
    })}
`;

const InfoContainer = styled.div`
    padding: 0 50px;
    flex: 1;
    ${mobile({
        padding: '10px',
    })}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 500;
    font-size: 40px;
    color: red;
`;

const FilterContainer = styled.div`
    // width: 50%;
    width: 100%;
    padding: 20px 20px;
    margin: 0px 0 20px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({
        width: '100%',
    })}
    border: 1px solid ${(props) => props.borderColor};
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid #ccc;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
        width: '100%',
    })}
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;

    &:hover {
        background-color: #f8f4f4;
    }
`;

const Span = styled.span`
    padding: 10px;
    color: red;
    font-weight: 600;
`;

const SelectSwap = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

const SwatchElement = styled.div`
    display: inline-block;
    margin-right: 8px;
    position: relative;
    vertical-align: bottom;
`;

const SwatchBlock = styled.div`
    display: block;
    margin: 0;
    background: #fff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: relative;
    border: 1px solid #e5e5e5;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
`;

const DesNote = styled.div`
    margin-top: 30px;
`;

const DesNote2 = styled.div`
    margin-top: 10px;
`;

const Sp = styled.span``;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [cat, setCat] = useState('');
    const [quantity, setQuantity] = useState(1);
    // const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.currentUser);

    // cảnh báo --------------------------------
    const [checkSize, setCheckSize] = useState(false);
    const [borderColor, setBorderColor] = useState('#ffffff');

    // -------------------

    const blurSize = (e) => {
        if (!e.target.value) {
            setCheckSize(false);
        } else {
            setCheckSize(true);
        }
    };

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const onChangeSize = (e) => {
        setSize(e.target.value);
        setBorderColor('#ffffff');
        document.getElementById('text').innerHTML = '';
    };

    // if (size === '') {
    //     console.log('roong');
    // }
    const handleClick = () => {
        // const cartProducts = { ...product, quantity, color, size };
        const cartProducts = { ...product, quantity, size };

        const addProductCarts = {
            userId: user._id,
            product_id: id,
            quantity_sp: quantity,
            size_sp: size,
        };
        if (checkSize) {
            addCart(user.token, dispatch, addProductCarts, cartProducts);
            // setBorderColor('#ffffff');
            // document.getElementById('text').innerHTML = '';
        } else {
            document.getElementById('text').innerHTML = 'Vui lòng chọn size';
            setBorderColor('red');
        }
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                // const res = await publicRequest.get('/products/find/' + id);
                const res = await axios.get(
                    'http://localhost:5000/api/products/find/' + id,
                );
                setProduct(res.data);
                setCat(res.data.categories[0]);
            } catch (err) {}
        };
        getProduct();
    }, [id]);

    console.log(cat);

    return (
        <Container>
            <NavBar />
            <Announcement />

            <Wrapper>
                <ImgContainer>
                    <Image src={product?.img} />
                </ImgContainer>

                <InfoContainer>
                    <Title>{product?.title}</Title>
                    {/* <Desc>{product?.desc}</Desc> */}
                    <Price>{product?.price}₫</Price>
                    <FilterContainer borderColor={borderColor}>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product?.color?.map((c) => (
                                <FilterColor
                                    color={c}
                                    key={c}
                                    // onClick={() => setColor(c)}
                                />
                            ))}
                        </Filter>

                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize
                                onBlur={blurSize}
                                onChange={onChangeSize}
                                // onChange={(e) => setSize(e.target.value)}
                            >
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>

                            {/* {product.size?.map((s) => (
                                <SelectSwap key={s}>
                                    <SwatchElement>
                                        <SwatchBlock
                                            onClick={handleSize}
                                            style={
                                                size === s
                                                    ? {
                                                          color: '#fff',
                                                          background: '#000',
                                                          border: '1px solid #000',
                                                      }
                                                    : {}
                                            }
                                        >
                                            <Sp>{s}</Sp>
                                        </SwatchBlock>
                                    </SwatchElement>
                                </SelectSwap>
                            ))} */}
                        </Filter>

                        <AmountContainer>
                            <Remove onClick={() => handleQuantity('dec')} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity('inc')} />
                        </AmountContainer>
                    </FilterContainer>

                    <AddContainer>
                        <Button onClick={handleClick}>Thêm vào giỏ hàng</Button>
                        <Span id="text"></Span>
                    </AddContainer>

                    <DesNote>
                        🔹 Bảng size Outerity
                        <br />S : Dài 69 Rộng 52.5 | 1m50 - 1m65, 45 -55Kg,
                        <br /> M : Dài 73 Rộng 55 | 1m60 - 1m75, 50 - 65Kg
                        <br /> L: Dài : 76.5 Rộng: 57.5 | 1m7 - 1m8, 65Kg - 80Kg
                        <br /> 👉 Nếu chưa biết lựa size bạn có thể inbox để được chúng
                        mình tư vấn.
                    </DesNote>

                    <DesNote2>
                        🔹 Chính sách đổi trả Outerity.
                        <br />– Miễn phí đổi hàng cho khách mua ở Outerity trong trường
                        hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, nhầm size.
                        <br />- Quay video mở sản phẩm khi nhận hàng, nếu không có video
                        unbox, khi phát hiện lỗi phải báo ngay cho Outerity trong 1 ngày
                        tính từ ngày giao hàng thành công. Qua 1 ngày chúng mình không
                        giải quyết khi không có video unbox.
                        <br />– Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng
                        <br />– Sản phẩm còn mới nguyên tem, tags, sản phẩm chưa giặt và
                        không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau
                        khi mua hàng.
                    </DesNote2>
                </InfoContainer>
            </Wrapper>

            <Similar cat={cat} />
            <Footer />
        </Container>
    );
};

export default Product;
