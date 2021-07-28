import React, { Component, useState } from 'react';

import Wrapper from './Wrapper';
import Img from 'components/Img';
import H1 from 'components/H1';
import ImgVonThunen from './img/von_thunen.png';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Wrapper>
        <a href="https://www.vonthunen.de">
          <Img className={"von_thunen"} src={ImgVonThunen} alt={"Von Thunen"}/>
        </a>
        <H1>Rechtsform-O-Mat</H1>
      </Wrapper>
    );
  }
}

export default Header;
