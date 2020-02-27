import styled from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    margin: 20px auto 0;
    padding: 0 20px;

    div.actions {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;

        button {
            padding: 10px;
            border-radius: 5px;
            border: 0;
            background: #000099;
            color: #FFF;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-right: 10px;
        }

        button:hover {
            opacity: 0.7;
        }

        button[disabled] {
            opacity: 0.5;
            cursor: default;
        }
    }
`;

export const Article = styled.article`
    background-color: #FFF;
    border: 1px solid #b3d1ff;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;

    a {
        height: 42px;
        width: 30%;
        border-radius: 5px;
        border: 2px solid #000099;
        background: none;
        margin-top: 10px;
        margin-left:35%;
        color: #000099;
        font-weight: bold;
        font-size: 16px;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
    }

    a:hover {
        background: #000099;
        color:#fff;
    }
`;

export const Strong = styled.strong``;

export const P = styled.p`
    font-size: 16px;
    color: #555;
    margin-top: 5px;
    line-height: 24px;
`;

export const Form = styled.form`
    margin-top: 10px;
    text-align: center;

    input {
        height: 26px;
        margin-right: 15px;
        padding: 0 5px;
        color: #000;
        font-size: 15px;
    }

    button {
        height: 26px;
        color: #fff;
        font-size: 16px;
        background: #0066ff;
        cursor: pointer;
        border: 0;
        border-radius: 5px;
        transition: all 0.3s;
        
    }
    
    button:hover {
        opacity: 0.7;
    }
`;