/*
 * QuizPage
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Slider from 'components/Slider';
import Wrapper from './Wrapper';
import { questions } from '../../components/constants';

export function QuizPage() {

  return (
    <Wrapper>
      <Helmet>
        <title>Quiz</title>
        <meta
          name="quiz page"
          content="quiz"
        />
      </Helmet>
      <Slider questions={questions}/>
    </Wrapper>
  );
}

export default QuizPage;
