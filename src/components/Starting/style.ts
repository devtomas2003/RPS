import styled from 'styled-components';

export const TextStarting = styled.p`
    margin-top: 10px;
    font-size: 18px;
`;

export const BoxSelect = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 90%;
`;

export const BoxBigBtn = styled.div`
    user-select: none;
    background: #feca21;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 250px;
    height: 250px;
    &:hover{
        cursor: pointer;
    }
`;

export const BBBText = styled.p`
    color: #fff;
    margin-top: 15px;
    font-weight: bold;
    font-size: 20px;
`;