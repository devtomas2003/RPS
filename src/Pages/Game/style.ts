import styled from "styled-components";

export const BoxZone = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    top: 30px;
    position: fixed;
    width: 100%;
`;

export const BoxContainer = styled.div`
    background: #fff;
    z-index: 5;
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 3px solid #ccc;
    border-radius: 10px;
    align-items: center;
    padding: 10px
`;

export const RPSText = styled.p`
    font-size: 35px;
    font-weight: bold;
`;