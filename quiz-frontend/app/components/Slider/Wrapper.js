import styled from 'styled-components';
import {device} from 'utils/device';

export default styled.div`
  margin: 2em auto;

  @media ${device.laptop} { 
    max-width: 800px;
  }

  @media ${device.desktop} {
    max-width: 1000px;
  }
`;
