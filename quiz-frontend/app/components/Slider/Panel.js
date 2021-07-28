import styled from 'styled-components';

const color = "#f0f6f7ff"

const Panel = styled.div`
  width: 80%;
  margin: 0 30px;
  margin-bottom: 30px;
  position: relative;
  padding:  20px 40px 20px 40px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${color};

  :after {
    content: "";
    display: block;
    border-style: solid;
    border-color: ${color} transparent transparent ${color};
    position: absolute;
    bottom: -30px;

    border-width: 15px;
    margin: 0;
    left: ${props => `${props.progress * 23 + 14}px`};
    right: auto;
  }
`;

export default Panel;
