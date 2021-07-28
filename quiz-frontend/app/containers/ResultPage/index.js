/*
 * ResultPage
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from './Wrapper';
import Chart from 'react-apexcharts';
import P from 'components/P'
import 'antd/dist/antd.css';
import { Input, Checkbox, Button } from 'antd';
import axios from 'axios';

import imageToBase64 from 'image-to-base64/browser';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { questions } from 'components/constants';
import { choices } from 'components/constants';

import logo from './img/von_thunen.jpg';

class ResultPage extends Component {

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePrivacy = this.handlePrivacy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    series: [{
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 430,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        max: 100,
        categories: ["KG", "GmbH & Co. KG", "GmbH", "AG", "SE", "GmbH & Co. KGaA", "SE & Co. KGaA", "Stiftung", "Stiftung & Co. KG"],
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        position: 'back',
        opacity: 0.5,
        xaxis: {
            lines: {
                show: true
            }
        },   
        yaxis: {
            lines: {
                show: false
            }
        },  
        row: {
            colors: undefined,
            opacity: 0.5
        },  
        column: {
            colors: undefined,
            opacity: 0.5
        },  
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },  
      }
    },
    matrix: [
      [5, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 3, 5, 4, 5, 3, 4],
      [1, 2, 2, 3, 3, 5, 5, 2, 3],
      [5, 4, 3, 2, 2, 1, 1, 1, 3],
      [5, 5, 2, 1, 1, 1, 1, 1, 4],
      [3, 3, 4, 4, 4, 4, 4, 1, 2],
      [2, 1, 2, 4, 4, 3, 4, 5, 2],
      [1, 1, 1, 4, 4, 4, 4, 4, 2],
      [1, 1, 1, 2, 2, 1, 2, 2, 2],
      [5, 1, 1, 1, 1, 1, 1, 1, 1],
      [3, 1, 1, 5, 5, 1, 5, 5, 5],
      [3, 3, 2, 3, 2, 3, 2, 2, 3],
      [3, 4, 5, 1, 1, 5, 1, 1, 1],
      [1, 1, 1, 4, 3, 3, 3, 1, 1],
      [4, 4, 1, 1, 1, 1, 1, 1, 3],
      [1, 1, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 4, 4, 4, 4, 4, 1, 1],
      [3, 4, 4, 2, 2, 2, 2, 1, 5],
      [1, 1, 2, 3, 3, 3, 3, 1, 1],
      [2, 2, 2, 2, 2, 2, 2, 1, 2],
      [5, 5, 5, 1, 1, 1, 1, 5, 5],
      [2, 1, 1, 1, 1, 1, 1, 3, 2],
      [1, 3, 5, 5, 2, 5, 4, 1, 1],
      [3, 3, 4, 5, 5, 5, 5, 3, 3],
      [4, 2, 2, 1, 1, 4, 4, 4, 4],
      [4, 3, 4, 5, 5, 5, 3, 1, 3],
    ],
    email: "",
    privacy: false,
  };

  componentDidMount() {
    const {result, resultB} = this.props.location.state;
    if (result == undefined) result = [];
    if (resultB == undefined) resultB = [];

    let valueF = 0;  // assume value
    for (let i = 0; i < Object.keys(resultB).length; i++) {
      valueF += resultB[i];
    }
    const valueP = 100 / valueF;

    const {matrix: matrixM, options} = this.state;

    let gSumAry = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < Object.keys(result).length; i++) {
      let selectedValue = result[i] + 1;
      for (let j = 0; j < options.xaxis.categories.length; j++) {
        const valueA = Math.abs(matrixM[i][j] - selectedValue)
        // 4 cases
        let x = 0;
        if (valueA > 2) x = 0;
        else if(valueA == 2) x = 0.25;
        else if(valueA == 1) x = 0.5;
        else if(valueA == 0) x = 1;
        const finalX = x * valueP;
        // calculate sum
        gSumAry[j] += finalX;
      }
    }

    const categories = ["KG", "GmbH & Co. KG", "GmbH", "AG", "SE", "GmbH & Co. KGaA", "SE & Co. KGaA", "Stiftung", "Stiftung & Co. KG"];
    let maxCategories = [];
    let maxData = [];
    for (let m = 0; m < 4; m++) {
      let max = Math.max.apply(null, gSumAry); // get the max of the array
      let index = gSumAry.indexOf(max);
      maxCategories.push(categories[index]);
      maxData.push(parseFloat(gSumAry[index]).toFixed(2))
      gSumAry[index] = 0;
    }

    this.setState({
      series: [{
        data: maxData
      }],
      options: {
        ...this.state.options,
        xaxis: {
          categories: maxCategories,
        },
      }
    })
  }

  handleChange = evt => {
    this.setState({
      email: evt.target.value,
      error: null
    });
  };

  handlePrivacy = evt => {
    this.setState({
      privacy: evt.target.checked,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default refresh by the browser

    const logoStr = await imageToBase64(logo)

    const chartInstance = this.chartRef.current;
    var chartImgURI = await chartInstance.chart.dataURI();

    // Q & A
    const {result, resultB} = this.props.location.state;

    let qaContents1= [];
    let qaContents2 = [];
    for (let i = 0; i < Object.keys(result).length; i++) {
      let question = questions[i];
      let answer = choices[result[i]];
      let score = "[" + resultB[i] + "]";

      if (resultB[i] == 0) answer = "ubersprungen";
      if (resultB[i] == 2) answer = "wichtig";

      answer = answer + score;
      const col0 = {
        width: 15,
        text: (i + 1) + '. '
      }
      const col1 = {
        width: 330,
        text: question
      }
      const col2 = {
        width: '*',
        text: answer
      }
      const content = {
        columns: [col0, col1, col2],
        style: 'padding'
      }
      if (i < 14) qaContents1.push(content);
      else qaContents2.push(content);
    }

    var docDefinition = {
      content: [
        {
          image: 'mark',
          width: 120,
          marginLeft: 195
        },
        { 
          text: 'Rechtsform-O-Mat',
          style: 'header'
        },
        { 
          text: 'Meine Fragen & Antworten',
          style: 'subheader'
        },
        ...qaContents1,
        {
          image: 'mark',
          width: 120,
          marginLeft: 195,
          marginBottom: 30,
          pageBreak: 'before'
        },
        ...qaContents2,
        {
          image: 'mark',
          width: 120,
          marginLeft: 195,
          pageBreak: 'before'
        },
        { 
          text: 'Mein Ergebnis',
          style: 'subheader'
        },
        {
          image: chartImgURI.imgURI,
          width: 500,
        },
        {
          text: 'Bitte beachten Sie, dass der Rechtsform-O-Mat ein reines Informationsangebot mit subjektivem Endresultat ist. Gerne besprechen wir mit Ihnen persönlich, ob das Ergebnis tatsächlich die optimale Rechtsform für Ihr Unternehmen darstellt.',
          style: 'paragraph'
        },
        {
          text: 'VON THUNEN Rechtsanwaltsbüro',
          style: 'span'
        },
        {
          text: 'Lessingstraße 3',
          style: 'span'
        },
        {
          text: '33604 Bielefeld',
          style: 'span'
        },
        {
          text: 'Telefon +49 521 80 06 70 0',
          style: 'span'
        },
        {
          text: 'Telefax +49 521 80 06 70 97',
          style: 'span'
        },
        {
          text: 'buero@vonthunen.de',
          style: 'span'
        },
        {
          columns: [
            {
              text: 'Dr. Sebastian von Thunen LL.M.'
            },
            {
              text: 'Dr. Christoph Mehringer LL.M.'
            },
          ],
          style: 'name'
        },
        {
          columns: [
            {
              text: 'Weitere Informationen über unser Büro finden Sie im Internet unter',
              width: 360
            },
            {
              text: 'www.vonthunen.de.',
              link: 'https://www.vonthunen.de/',
              decoration: 'underline'
            },
          ],
          columnGap: 0
        }
      ],
      images: {
        mark: 'data:image/jpeg;base64,' + logoStr
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          marginTop: 40
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          marginTop: 20,
          marginBottom: 15
        },
        padding: {
          marginTop: 10
        },
        paragraph: {
          marginTop: 20,
          marginBottom: 10
        },
        span: {
          marginTop: 10,
          marginBottom: 10,
          alignment: 'center'
        },
        name: {
          marginTop: 40,
          marginBottom: 40,
          alignment: 'center'
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    }

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBase64((data) => {

      axios({
        method: "POST", 
        url:"/send", 
        data: {
            email: this.state.email,  
            data: data
        }
      }).then((response)=>{
          if (response.data.msg === 'success'){
              alert("Email Sent."); 
          }else if(response.data.msg === 'fail'){
              alert("Email failed to send.")
          }
      })

    });
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Result</title>
          <meta
            name="result page"
            content="result"
          />
        </Helmet>
        <Chart ref={this.chartRef} options={this.state.options} series={this.state.series} type="bar" height={430} />
        <h3 style={{textAlign: 'center', fontWeight: 700}}>
          Anzeige der fünf besten Ergebnisse.
        </h3>
        <P>
          <span>Wir hoffen, dass der Rechtsform-O-Mat Ihnen neue Anregungen zum Thema der Rechtsformwahl geboten hat (und bestenfalls auch ein wenig Vergnügen bereitet hat). Gerne besprechen wir mit Ihnen persönlich, ob Ihr Ergebnis tatsächlich die beste Rechtsform für Ihr Unternehmen ist </span>
          <a
            href="https://www.vonthunen.de/"
          >
            vonthunen.de
          </a>
        </P>
        <h3 style={{textAlign: 'center', fontWeight: 700}}>
          Ergebnis zusenden?
        </h3>
        <P>
          <span>Möchten Sie die Fragen, Ihre Antworten und Ihr Ergebnis (als pdf-Dokument) zugesendet bekommen? Wenn ja, tragen Sie bitte nachfolgend Ihre Emailadresse ein und willigen Sie bitte in die Datenschutzerklärung ein. </span>
          <div style={{paddingTop: '20px'}}>
            <span>Email: </span>
            <Input
              style={{width: '200px'}}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
        </P>
        <P style={{paddingTop: '30px'}}>
          <Checkbox
            value={this.state.privacy}
            onChange={this.handlePrivacy}
          />
          <span style={{paddingLeft: '30px'}}>
            Hiermit willige ich ein, dass VON THUNEN Rechtsanwaltsbüro, Lessingstraße 3, 33604 Bielefeld meine Emailadresse speichert, um mir die Ergebnisse meiner Teilnahme am Rechtsform-O-Mat zuzusenden. Ich erkläre mich außerdem damit einverstanden, dass VON THUNEN Rechtsanwaltsbüro meine Emailadresse verwendet, um mir gelegentlich den Newsletter des Rechtsanwaltsbüros, Veranstaltungshinweise oder andere relevante Informationen für Familienunternehmer zu senden. 
            Ihre Emailadresse wird nicht an Dritte weitergegeben und nicht für andere Zwecke verwandt. Ihre Einwilligung ist freiwillig. Sie haben das Recht, Ihre Einwilligung durch Mitteilung an buero@vonthunen.de jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt (Verarbeitung gemäß Art. 6 Abs. lit. a) DSGVO). Weitere Informationen zur Verarbeitung Ihrer personenbezogenen Daten erhalten Sie in unserer Datenschutzinformation.
          </span>
        </P>
        <P>
          <Button
            type="primary"
            disabled={!this.state.privacy}
            style={{marginTop: '30px', marginRight: '30px', float: 'right'}}
            size="large"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </P>
      </Wrapper>
    );
  }
}

export default ResultPage;
