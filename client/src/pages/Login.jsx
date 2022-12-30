import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';
import { useNavigate, Link } from 'react-router-dom';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
`;

const Wrapper = styled.div`
    background-color: white;
    padding: 20px;
    width: 25%;
    border-radius: 6px;
    ${mobile({
        width: '75%',
    })}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`;
const Form = styled.div`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    font-weight: 500;
    border-radius: 3px;
    margin-top: 20px;

    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Link1 = styled.a`
    margin: 5px 0;
    font-size: 14px;
    cursor: pointer;
    color: red;
`;

const Link2 = styled.a`
    margin: 5px 0;
    font-size: 12px;
    cursor: pointer;
    color: #05a;
`;

const Error = styled.span`
    color: red;
`;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    background: white;
    width: 100%;
    height: 75px;
    align-items: center;
    justify-content: space-between;
    padding: 0 275px;
`;

const HeaderContai = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderImg = styled.img`
    height: 38px;
    cursor: pointer;
`;

const HeaderTitle = styled.h2`
    font-size: 26px;
    padding-left: 25px;
`;

const HeaderHelp = styled.p`
    color: red;
    font-weight: 500;
    cursor: pointer;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { isFetching, error } = useSelector(
    //     (state) =>
    //         // state.user?.login || { currentUser: null, isFetching: false, error: false },
    //         state?.user,
    // );

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     // e.stopPropagation();
    //     // login(dispatch, { username, password });

    //     // test
    //     login(dispatch, { username, password }, navigate);
    // };

    // test
    const { isFetching, error } = useSelector((state) => state?.auth);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password }, navigate);
    };
    //

    return (
        <div>
            <Header>
                <HeaderContai>
                    <Link to="/">
                        <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                    </Link>
                    <HeaderTitle>Đăng nhập</HeaderTitle>
                </HeaderContai>
                <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
            </Header>

            <Container>
                <Wrapper>
                    <Title>Đăng nhập</Title>
                    <Form>
                        <Input
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={handleClick} disabled={isFetching}>
                            ĐĂNG NHẬP
                        </Button>
                        {/* <Button onClick={handleClick}>LOGIN</Button> */}
                        {error && <Error>Tài khoản mật khẩu không chính xác...</Error>}
                        {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>   */}
                        <div
                            style={{
                                marginTop: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Link style={{ textDecoration: 'none' }}>
                                <Link2>Quên mật khẩu</Link2>
                            </Link>
                            {/* <Link to="/register" style={{ textDecoration: 'none' }}> */}
                            <Link
                                to="/confirm/register"
                                style={{ textDecoration: 'none' }}
                            >
                                <Link1>Đăng kí</Link1>
                            </Link>
                        </div>
                    </Form>
                </Wrapper>
            </Container>
        </div>
    );
};

export default Login;
