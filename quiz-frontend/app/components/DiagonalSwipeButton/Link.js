import styled from 'styled-components';

import buttonStyles from './buttonStyles';

import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

export default StyledLink;
