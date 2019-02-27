import React, { Component } from 'react'
import RoundBarChart from './components/RoundBarChart/index'
import LineChart from './components/LineChart/index'
import { Container, Row, Col } from 'reactstrap'

const seriesBar = [{
  data: [11, 12, 14, 12, 15, 10, 13, 14, 12, 12, 14]
}]

const seriesBar2 = [{
  data: [21, 32, 44, 52, 15, 13, 53, 54, 12, 42, 54]
}]

const seriesBar3 = [{
  data: [121, 32, 144, 52, 115, 113, 53, 154, 12, 42, 154]
}]

const seriesLine = [{
  data: [10, 8, 1, 3, 2, 6, 17, 19, 14, 12, 16, 22]
}]

function customRenderTooltipContent(chartColor, chartX, chartY) {
  return (<React.Fragment>
      <div style={{
      display: 'inline-block',
      background: chartColor,
      borderRadius: 50,
      verticalAlign: 'middle',
      marginRight: 6,
      width: 4,
      height: 4
      }} />
      <span>value: {chartY}</span>
  </React.Fragment>)
}

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
        <Col className="text-center mb-3"><h1 className="display-4">Charts</h1></Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <RoundBarChart 
              series={seriesBar} 
              color={'#5D88FC'}
              viewBox={'0 0 200 30'}
              showTooltip={true}
            />
          </Col>
          <Col>
            <RoundBarChart 
              series={seriesBar2} 
              color='#FF5879' 
              viewBox={'0 0 200 30'}
              layerWidth={'70%'}
              showTooltip={true}
              renderTooltipContent={customRenderTooltipContent}
            />
          </Col>
          <Col>
          <RoundBarChart 
            series={seriesBar3} 
            color={'#FFB335'}
            viewBox={'0 0 200 30'}
            showTooltip={true}
            renderTooltipContent={(chartColor, chartX, chartY) => (<div>tooltip text</div>)}
          />
          </Col>
        </Row>
        <Row className="mb-8">
          <Col>
          <LineChart
            series={seriesLine} 
            color={'#15E1A7'}
            viewBox={'0 0 100 30'}
            layerWidth={'76%'}
            showTooltip={true}
            asArea={true}
          />
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

export default App;
