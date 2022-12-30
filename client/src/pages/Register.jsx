import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../redux/apiCalls';
import { mobile } from '../responsive';

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
    padding: 25px;
    width: 27%;
    border-radius: 3px;
    ${mobile({
        width: '75%',
    })}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`;
const Form = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    // margin-top: 30px;
    padding: 10px;
`;
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;
const Button = styled.button`
    font-weight: 500;
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-top: 15px;
    border-radius: 3px;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const Span = styled.span`
    padding: 10px 0;
    font-size: 12px;
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

const Text = styled.p`
    white-space: pre;
    padding-right: 4px;
    color: rgba(0, 0, 0, 0.26);
    text-align: center;
    width: 100%;
`;

const TextLine = styled.span`
    color: #ee4d2d;
    font-weight: 500;
    margin-left: 7px;
    cursor: pointer;
`;

const FormInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

// --------------------------------------------------------------

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [succesPw, setSuccesPw] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmName, setConfirmName] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [confirmSuccessPassword, setConfirmSuccessPassword] = useState(false);

    // ------------- nhập gmail để tới bước tiếp theo ------
    const [userid, setUserid] = useState({});
    const [gmail, setGmail] = useState('');
    const confirm = true;

    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    const handleClick = (e) => {
        e.preventDefault();
        // register(dispatch, { username, password, email }, navigate);
        register(dispatch, { username, password, userid }, navigate);

        // navigate('/login');
    };

    const blurUsername = (e) => {};

    const blurEmail = (e) => {};

    const blurPassword = (e) => {};
    const blurConfirmPassword = (e) => {};

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:5000/api/auth/${param.id}/verify/${param.token}`;
                const res = await axios.get(url);
                setUserid(res.data.id);
                // console.log(data);
                setValidUrl(true);
            } catch (err) {
                console.log(err, 'từ email để vô đăng kí thất bại');
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <>
            {validUrl ? (
                <div>
                    <Header>
                        <HeaderContai>
                            <Link to="/">
                                <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
                            </Link>
                            <HeaderTitle>Đăng kí</HeaderTitle>
                        </HeaderContai>
                        <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
                    </Header>
                    <Container>
                        <Wrapper>
                            <Title style={{ marginBottom: '30px' }}>Đăng ký</Title>
                            <Form>
                                <FormInput>
                                    <Input
                                        value={username}
                                        type="text"
                                        placeholder="Tên tài khoản"
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={blurUsername}
                                    />
                                    <Span id="username"></Span>
                                    {/* <Input
                                        value={email}
                                        type="email"
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={blurEmail}
                                    />
                                    <Span id="email"></Span> */}
                                    <Input
                                        value={password}
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={blurPassword}
                                        id="mk"
                                    />
                                    <Span id="password"></Span>
                                    <Input
                                        value={succesPw}
                                        onChange={(e) => setSuccesPw(e.target.value)}
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        onBlur={blurConfirmPassword}
                                    />
                                    <Span id="confirm_password"></Span>

                                    {/* <Span id="succes"></Span> */}

                                    <Button
                                        disabled={
                                            // !email || !password || !username || !succesPw
                                            !password || !username || !succesPw
                                        }
                                        onClick={handleClick}
                                    >
                                        ĐĂNG KÝ
                                    </Button>
                                </FormInput>

                                <Agreement>
                                    Bằng cách tạo một tài khoản, tôi đồng ý với việc xử lý
                                    dữ liệu cá nhân của mình theo
                                    <b
                                        style={{
                                            color: '#ee4d2d',
                                            fontSize: '11px',
                                            marginLeft: '3px',
                                        }}
                                    >
                                        ĐIỀU KHOẢN DỊCH VỤ
                                    </b>{' '}
                                    &{' '}
                                    <b style={{ color: '#ee4d2d', fontSize: '11px' }}>
                                        CHÍNH SÁCH BẢO MẬT
                                    </b>
                                </Agreement>

                                <Text>
                                    Bạn đã có tài khoản?
                                    <Link style={{ textDecoration: 'none' }} to="/login">
                                        <TextLine>Đăng nhập</TextLine>
                                    </Link>
                                </Text>
                            </Form>
                        </Wrapper>
                    </Container>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    );
};

export default Register;

// const handleClick = (e) => {
//     e.preventDefault();
//     register(dispatch, { username, password, email }, navigate);

//     // if (confirmName && confirmEmail && confirmPassword && confirmSuccessPassword) {
//     //     register(dispatch, { username, password, email }, navigate);
//     // } else {
//     //     document.getElementById('succes').innerHTML =
//     //         'Vui lòng nhập đầy đủ các trường';
//     // }
// };

// const blurUsername = (e) => {
//     // if (!e.target.value) {
//     //     document.getElementById('username').innerHTML = 'Vui lòng nhập trường này';
//     //     setConfirmName(false);
//     // } else {
//     //     document.getElementById('username').innerHTML = '';
//     //     document.getElementById('succes').innerHTML = '';
//     //     setConfirmName(true);
//     // }
// };

// const blurEmail = (e) => {
//     // var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     // if (!e.target.value) {
//     //     document.getElementById('email').innerHTML = 'Vui lòng nhập trường này';
//     //     setConfirmEmail(false);
//     // } else if (!regex.test(e.target.value)) {
//     //     document.getElementById('email').innerHTML = 'Trường này phải là email';
//     //     setConfirmEmail(false);
//     // } else {
//     //     document.getElementById('email').innerHTML = '';
//     //     setConfirmEmail(true);
//     //     document.getElementById('succes').innerHTML = '';
//     // }
// };

// const blurPassword = (e) => {
//     // if (e.target.value.length < 6) {
//     //     document.getElementById('password').innerHTML =
//     //         'Vui lòng nhập tối thiểu 6 kí tự';
//     //     setConfirmPassword(false);
//     // } else {
//     //     document.getElementById('password').innerHTML = '';
//     //     setConfirmPassword(true);
//     //     document.getElementById('succes').innerHTML = '';
//     // }
// };
// const blurConfirmPassword = (e) => {
//     // let mk = document.getElementById('mk');
//     // console.log(mk.value);
//     // if (!e.target.value) {
//     //     document.getElementById('confirm_password').innerHTML =
//     //         'Vui lòng nhập trường này';
//     //     setConfirmSuccessPassword(false);
//     // } else if (!(e.target.value === mk.value)) {
//     //     document.getElementById('confirm_password').innerHTML =
//     //         'Mật khẩu nhập lại không chính xác';
//     //     setConfirmSuccessPassword(false);
//     // } else {
//     //     document.getElementById('confirm_password').innerHTML = '';
//     //     setConfirmSuccessPassword(true);
//     //     document.getElementById('succes').innerHTML = '';
//     // }
// };

// // useEffect(() => {
// //     if (!(confirmName && confirmEmail && confirmPassword && confirmSuccessPassword)) {
// //         document.getElementById('succes').innerHTML =
// //             'Vui lòng nhập đầy đủ các trường';
// //     }
// // }, [confirmName, confirmEmail, confirmPassword, confirmSuccessPassword]);

// return (
//     <div>
//         <Header>
//             <HeaderContai>
//                 <Link to="/">
//                     <HeaderImg src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png" />
//                 </Link>
//                 <HeaderTitle>Đăng kí</HeaderTitle>
//             </HeaderContai>
//             <HeaderHelp>Bạn cần giúp đỡ ?</HeaderHelp>
//         </Header>
//         <Container>
//             <Wrapper>
//                 <Title style={{ marginBottom: '30px' }}>Đăng ký</Title>
//                 <Form>
//                     {/* Email */}

//                     {confirm ? (
//                         <FormInput>
//                             <Input
//                                 value={username}
//                                 type="text"
//                                 placeholder="Tên tài khoản"
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 onBlur={blurUsername}
//                             />
//                             <Span id="username"></Span>
//                             <Input
//                                 value={email}
//                                 type="email"
//                                 placeholder="email"
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 onBlur={blurEmail}
//                             />
//                             <Span id="email"></Span>
//                             <Input
//                                 value={password}
//                                 type="password"
//                                 placeholder="Nhập mật khẩu"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 onBlur={blurPassword}
//                                 id="mk"
//                             />
//                             <Span id="password"></Span>
//                             <Input
//                                 value={succesPw}
//                                 onChange={(e) => setSuccesPw(e.target.value)}
//                                 type="password"
//                                 placeholder="Nhập lại mật khẩu"
//                                 onBlur={blurConfirmPassword}
//                             />
//                             <Span id="confirm_password"></Span>

//                             {/* <Span id="succes"></Span> */}

//                             <Button
//                                 disabled={
//                                     !email || !password || !username || !succesPw
//                                 }
//                                 onClick={handleClick}
//                             >
//                                 ĐĂNG KÝ
//                             </Button>
//                         </FormInput>
//                     ) : (
//                         <FormInput>
//                             <Input
//                                 type="text"
//                                 placeholder="Gmail"
//                                 onChange={(e) => setGmail(e.target.value)}
//                                 value={gmail}
//                                 onBlur={blurEmail}
//                             />
//                             <Span id="email"></Span>
//                             <Button
//                                 style={{ marginTop: '30px' }}
//                                 disabled={!gmail}
//                                 onClick={handleClick}
//                             >
//                                 TIẾP THEO
//                             </Button>
//                         </FormInput>
//                     )}

//                     <Agreement>
//                         Bằng cách tạo một tài khoản, tôi đồng ý với việc xử lý dữ liệu
//                         cá nhân của mình theo
//                         <b
//                             style={{
//                                 color: '#ee4d2d',
//                                 fontSize: '11px',
//                                 marginLeft: '3px',
//                             }}
//                         >
//                             ĐIỀU KHOẢN DỊCH VỤ
//                         </b>{' '}
//                         &{' '}
//                         <b style={{ color: '#ee4d2d', fontSize: '11px' }}>
//                             CHÍNH SÁCH BẢO MẬT
//                         </b>
//                     </Agreement>

//                     <Text>
//                         Bạn đã có tài khoản?
//                         <Link style={{ textDecoration: 'none' }} to="/login">
//                             <TextLine>Đăng nhập</TextLine>
//                         </Link>
//                     </Text>
//                 </Form>
//             </Wrapper>
//         </Container>
//     </div>
// );
// };

// export default Register;
