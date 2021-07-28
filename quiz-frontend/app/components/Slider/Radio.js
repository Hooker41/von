import PropTypes from "prop-types";
import React, { Component } from "react";
import classnames from "classnames";

import CheckMark from './img/check-icn.svg';
import './scss/radio.scss';

export class Radio extends Component {
  state = {};

  render() {
    const { selected, onChange, text, value } = this.props;
    return (
      <div
        className="modern-radio-container"
        onClick={() => {
          onChange(value);
        }}
      >
        <div className={`radio-outer-circle ${classnames({"unselected": value !== selected})}`}>
          <div className={`radio-inner-circle ${classnames({"unselected-circle": value !== selected})}`}>
            <img src={CheckMark} alt="Checked Icon" width={12} height={12} className={`checkmark ${value !== selected &&"unselected-checkmark"}`}/>
          </div>
        </div>
        <div className={`helper-text ${value !== selected && "unselected-text"}`}>{text}</div>
      </div>
    );
  }
}

Radio.propTypes = {
  text: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
