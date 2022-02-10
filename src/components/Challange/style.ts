import styled from "styled-components";

export const TextChallange = styled.p`
    margin-top: 10px;
    font-size: 25px;
`;

export const VSText = styled.label`
    font-weight: bold;
`;

export const BoxOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-top: 15px;
`;

export const ItemOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ebebeb;
    border-radius: 20px;
    width: 200px;
    height: 200px;
    user-select: none;
    &:hover{
        cursor: pointer;
    }
`;

export const IOText = styled.p`
    font-size: 30px;
    color: #333;
`;

export const WhoPlay = styled.p`
    font-size: 23px;
    align-self: flex-start;
    margin-left: 5%;
    margin-top: 15px;
`;

export const LinkBack = styled.label`
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
`;