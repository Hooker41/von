/**
 *
 * DiagonalSwipeButton.js
 * 
 */

 import React, { Children } from 'react';
 import PropTypes from 'prop-types';
 
 import Link from './Link';
 import Wrapper from './Wrapper';
 
 function Button(props) {
   let button = (
     <Link to={props.to}>
       {Children.toArray(props.children)}
     </Link>
   );
 
   return <Wrapper>{button}</Wrapper>;
 }
 
 Button.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
 };
 
 export default Button;
 