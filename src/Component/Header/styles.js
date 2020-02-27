import styled from "styled-components";

export const Headerr = styled.header`
    width: 100%;
    height: 60px;
    background-color: #000099;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    
    p {
        margin-right: 50px;
    }

    p#toDashboard {
        margin-right: 50px;
        font-size: 13px;
        cursor:pointer;
    }

    button {
        height: 32px;
        border-radius: 5px;
        border: 2px solid #000;
        background: #8080ff;
        margin-right: 10px;
        color: #FFFF;
        font-weight: bold;
        font-size: 13px;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
        cursor:pointer;
    }

    button:hover {
        opacity: 0.7;
    }

    a {
        height: 32px;
        border-radius: 5px;
        border: 2px solid #000;
        background: #8080ff;
        margin-right: 10px;
        color: #FFFF;
        font-weight: bold;
        font-size: 13px;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;    
    }

    a:hover {
        opacity: 0.7;
    }
`;