import { css } from 'styled-components';

const buttonStyles = css`
  text-decoration: none;
  line-height: 60px;
  color: #000000;
  background-color: white;
  z-index: 0;
  margin: auto;
  
  position: relative;
  display: block;
  overflow: hidden;
  border: 1px solid currentColor;

  width: 100%;
  height: 60px;
  max-width: 250px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  transition: 0.3s ease-in-out;

  &:before{
    content: "";
    position: absolute;
    top: 0;
    right: -50px;
    bottom: 0;
    left: 0;
    border-right: 50px solid transparent;
    border-bottom: 80px solid black;
    transform: translateX(-100%);

    box-sizing: border-box;
    transition: 0.3s ease-in-out;
    z-index: -1;
  }

  &:hover {
    color: white;
    transition: 0.3s ease-in-out;
  }

  &:hover:before{
    transform: translateX(0);
    z-index: -1;
  }
`;

export default buttonStyles;
