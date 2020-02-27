import styled from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    min-width: 500px;
    margin: 25px auto 0;
    padding: 0 100px;
`;

export const Form = styled.form`
    max-width: 400px;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid #b3d1ff;
    border-radius: 5px;

    img {
        width: 250px;
        margin: 10px 0 40px;
      }

      p {
        color: #ff3333;
        margin-bottom: 15px;
        border: 1px solid #ff3333;
        padding: 10px;
        width: 100%;
        text-align: center;
      }

      input {
        flex: 1;
        height: 46px;
        margin-bottom: 10px;
        padding: 0 20px;
        color: #777;
        font-size: 20px;
        width: 100%;
        border: 2px solid #ddd;
        &::placeholder {
          color: #999;
        }
      }

      button {
        color: #fff;
        font-size: 16px;
        background: #0066ff;
        cursor: pointer;
        height: 56px;
        border: 0;
        border-radius: 5px;
        width: 100%;
        transition: all 0.3s;
      }

      button:hover {
          opacity: 0.7;
      }

      hr {
        margin: 20px 0;
        border: none;
        border-bottom: 1px solid #cdcdcd;
        width: 100%;
      }

      a {
        font-size: 16;
        font-weight: bold;
        color: #999;
        text-decoration: none;
      }
`;
