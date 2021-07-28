import React, { Component } from 'react';
import Flickity from "react-flickity-component";
import { withRouter } from 'react-router-dom';
import { range } from 'lodash';

import Wrapper from './Wrapper';
import Indicator from './Indicator';

import Descrpition from './Description';
import Title from './Title';
import Panel from './Panel';
import { Radio } from './Radio';
import './scss/arrow.scss';
import './scss/flicikity.scss';
import { choices } from '../constants';
import 'antd/dist/antd.css';
import {Checkbox} from 'antd';

class Slider extends Component {

  constructor(props) {
    super(props);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleNextQuizClick = this.handleNextQuizClick.bind(this);
    this.handleSkipQuizClick = this.handleSkipQuizClick.bind(this);
    this.handleQuizChange = this.handleQuizChange.bind(this);
    this.handleImportant = this.handleImportant.bind(this);
  }

  state = {
    quizCount: this.props.questions.length,
    progress: 0,
    quizSelected: 0,
    radioSelected: -1,
    
    result: {},
    resultB: {},
    important: false,
  }

  handleAnswerChange(value) {
    const {quizSelected, result} = this.state;
    this.setState((state) => {
      return {
        ...state,
        result: {
          ...result,
          [quizSelected]: value
        },
        radioSelected: value
      }
    })
  }

  handleNextQuizClick() {
    const {quizCount, progress, quizSelected, result, resultB, important, radioSelected} = this.state;
    if (quizSelected < quizCount - 1) {
      this.setState((state) => {
        return {
          ...state,
          radioSelected: result[quizSelected + 1] != undefined ? result[quizSelected + 1] : -1,
          progress: quizSelected == progress ? progress + 1 : progress,
          quizSelected: quizSelected + 1,
          resultB: {
            ...resultB,
            [quizSelected]: important ? 2 : (radioSelected > 0 ? 1 : 0)
          },
          important: false,
        }
      })
      this.flkty.next();
    } else {
      this.props.history.push({
        pathname: '/result',
        state: { result, resultB }  
      });
    }
  }

  handleSkipQuizClick() {
    const {quizCount, progress, quizSelected, result, resultB} = this.state;
    if (quizSelected < quizCount - 1) {
      this.setState((state) => {
        return {
          ...state,
          result: {
            ...result,
            [quizSelected]: -1
          },
          radioSelected: -1,
          progress: quizSelected == progress ? progress + 1 : progress,
          quizSelected: quizSelected + 1,
          resultB: {
            ...resultB,
            [quizSelected]: 0
          },
          important: false,
        }
      })
      this.flkty.next();
    } else {
      this.props.history.push({
        pathname: '/result',
        state: { result, resultB }  
      });
    }
  }

  handleQuizChange(ele) {
    const {result, resultB} = this.state;
    this.setState((state) => {
      return {
        ...state,
        radioSelected: result[ele] != undefined ? result[ele] : -1,
        quizSelected: ele,
        important: result[ele] != undefined ? result[ele] : false,
      }
    })
    this.flkty.select(ele);
  }

  handleImportant(evt) {
    const checked = evt.target.checked;
    this.setState({
      important: checked,
    });
  }

  render() {
    const {questions} = this.props;
    const {quizCount, radioSelected, progress, quizSelected} = this.state;

    const flickityOptions = {
      draggable: false,
      prevNextButtons: false,
      pageDots: false
    }

    return (
      <Wrapper>
        <Flickity
          flickityRef={c => this.flkty = c}
          options={flickityOptions}
        >
          {
            range(0, quizCount).map((ele, key)=> {
              return (
                <Panel key={key.toString()} progress={ele}>
                  <Title>{`${ele+1}/${quizCount}`} {questions[ele]}</Title>
                  <Descrpition>
                    Erlauterung: Die Grundung einer Gesellschaft verursacht Kosten unter anderem fur den Notar.
                  </Descrpition>
            
                  {
                    choices.map((ele, key) => {
                      return (
                        <Radio
                          key={key}
                          value={key}
                          selected={radioSelected}
                          text={`${key + 1} (${ele})`}
                          onChange={this.handleAnswerChange}
                        />
                      )
                    })
                  }
                  <Checkbox
                    className="checkbox-important"
                    value={this.state.important}
                    onChange={this.handleImportant}
                  >
                    Important
                  </Checkbox>

                  <div className="button-row">
                    <div className="skip-btn" onClick={() => this.handleNextQuizClick()}>
                      <div className="label">weiter</div>
                      <div className="arrow"/>
                    </div>
                    <div className="skip-btn" onClick={() => this.handleSkipQuizClick()}>
                      <div className="label">These uberspringen</div>
                      <div className="arrow"/>
                    </div>
                  </div>
                </Panel>)
            })
          }
        </Flickity>
        <Indicator quizCount={quizCount} answered={progress} selectedQuiz={quizSelected} onQuizChange={this.handleQuizChange}/>
      </Wrapper>
    );
  }
}

export default withRouter(Slider);
