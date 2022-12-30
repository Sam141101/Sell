import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const Container = styled.div`
    text-align: center;
    margin: 0px 0 20px 0;
`;

const Pagi = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const Text = styled.span`
    font-size: 18px;
    font-weight: 500;
`;

const Button = styled.button`
    padding: 10px;
    background-color: red;
    border-radius: 3px;
    display: flex;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Pagination = (props) => {
    const { pagination, onPageChange } = props;
    const { page, totalRows } = pagination;
    const totalPages = Math.ceil(totalRows / 12);

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        }
    };

    return (
        <Container>
            <Text>
                Trang số {page} - {totalPages}
            </Text>

            <Pagi>
                <Button
                    style={{ marginRight: '20px' }}
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    <KeyboardArrowLeft
                        style={{ color: 'white', fontWeight: 'bold' }}
                        fontSize="large"
                    />
                </Button>

                <Button
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    <KeyboardArrowRight
                        style={{ color: 'white', fontWeight: 'bold' }}
                        fontSize="large"
                    />
                </Button>
            </Pagi>
        </Container>
    );
};

export default Pagination;
