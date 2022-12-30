import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;
    ${mobile({
        flexDirection: 'column',
    })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        display: 'none',
    })}
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    padding: 20px;
    flex: 1;
    ${mobile({
        backgroundColor: '#fff8f8',
    })}
`;

const ContactItem = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Outerity</Logo>
                <Desc>
                    Chúng mình xuất hiện để đem tới mọi người một chất lượng áo tốt nhất,
                    với giá thành hấp dẫn nhất để đưa Outerity đến với tất cả lứa tuổi và
                    khắp mọi vùng miền đất nước
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>

                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>

                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>

                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>

            <Center>
                <Title>Use Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Terms</ListItem>
                    <ListItem>WishList</ListItem>
                </List>
            </Center>

            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: '10px' }} /> The New Playground, 04 Phạm
                    Ngũ Lão, quận 1, HCM
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: '10px' }} /> 1900 633 028
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: '10px' }} /> huysang@gmail.com
                </ContactItem>
            </Right>
        </Container>
    );
};

export default Footer;
