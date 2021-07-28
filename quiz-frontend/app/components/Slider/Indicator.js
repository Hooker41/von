/**
 *
 * Indicator.js
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';

import './scss/indicator.scss';
import { range } from 'lodash';

function Indicator(props) {
  const {quizCount, answered, selectedQuiz, onQuizChange} = props;
  return (
    <ol className="slide-dots">
      {
        range(0, quizCount).map((ele, key) => {
          return (
            <li key = {key.toString()} className={`dot ${ele == selectedQuiz ? "selected" : ele <= answered ? "answered" : ""}`} onClick={() => ele <= answered ? onQuizChange(ele) : ""}/>
          )
        })
      }
    </ol>
  );
}

Indicator.defaultProps = {
  quizCount: 26,
  answered: 5
}

Indicator.propTypes = {
  quizCount: PropTypes.node.isRequired,
  answered: PropTypes.number.isRequired,
  selectedQuiz: PropTypes.number.isRequired,
  onQuizChange: PropTypes.func.isRequired,
};

export default Indicator;