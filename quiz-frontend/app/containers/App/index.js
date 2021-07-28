/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import QuizPage from 'containers/QuizPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import HomePage from 'containers/HomePage/Loadable';
import {device} from 'utils/device';
import ResultPage from 'containers/ResultPage/Loadable';

const AppWrapper = styled.div`
  margin: auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;

  font-family: "sans-serif";

  @media ${device.laptop} { 
    max-width: 1000px;
  }

  @media ${device.desktop} {
    max-width: 1400px;
  }
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Quiz"
        defaultTitle="Wahl-O-Mat"
      >
        <meta name="description" content="Judgement Quiz" />
      </Helmet>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/quiz" component={QuizPage} />
          <Route path="/result" component={ResultPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
