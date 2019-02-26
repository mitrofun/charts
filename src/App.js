import React, { Component } from 'react';
import RoundBarChart from './components/RoundBarChart/index'
import { Container, Row, Col } from 'reactstrap';

const series = [{
  data: [11, 12, 14, 12, 15, 10, 13, 14, 12, 12, 14]
}]

const series2 = [{
  data: [21, 32, 44, 52, 15, 13, 53, 54, 12, 42, 54]
}]

const series3 = [{
  data: [121, 32, 144, 52, 115, 113, 53, 154, 12, 42, 154]
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
              series={series} 
              color='#5D88FC' 
              viewBox={'0 0 200 30'}
              showTooltip={true}
              tooltipOffset={[0, -14]}
            />
          </Col>
          <Col>
            <RoundBarChart 
              series={series2} 
              color='#FF5879' 
              viewBox={'0 0 200 30'}
              layerWidth={'70%'}
              showTooltip={true}
              tooltipOffset={[0, -14]}
              renderTooltipContent={customRenderTooltipContent}
            />
          </Col>
          <Col>
          <RoundBarChart 
            series={series3} 
            color='#FFB335' 
            viewBox={'0 0 200 30'}
            showTooltip={true}
            tooltipOffset={[0, -14]}
            renderTooltipContent={(chartColor, chartX, chartY) => (<div>tooltip text</div>)}
          />
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
    )
  }
}

export default App;
