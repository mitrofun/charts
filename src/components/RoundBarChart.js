import React, {Component} from 'react'
import { Chart, Bars, Layer, Animate, Handlers } from 'rumble-charts'

import './RoundBarChart.css'

class RoundBarChart extends Component {
    state = {
        showTooltip: false,
        clientX: 0,
        clientY: 0,
        chartX: 0,
        chartY: 0
    }

    handleClick = ({closestPoints}) => {
        const closest = closestPoints[0];
        if (!closest) {
            return;
        }
        const {seriesIndex, pointIndex, point} = closest
        const {x: chartX, y:chartY} = point
        console.log(seriesIndex, pointIndex)
        this.setState({
            showTooltip: true,
            chartX,
            chartY
        })
    }

    setCursorLocation = e => {
        const {clientX, clientY} = e
        this.setState({
            clientX, 
            clientY
        })
    }


    render() {
        const {color, series, viewBox} = this.props
        const {showTooltip, clientX, clientY, chartX, chartY} = this.state
        const tooltip = showTooltip ? 
            <div 
                id='barTooltip' 
                className='chart-tooltip' 
                style={{
                    position: 'fixed',
                    left: clientX,
                    top: clientY,
                }}>show {chartY}</div> 
        : null
        return (
            <div>
            {tooltip}
            <Chart 
                viewBox={viewBox}
                series={series} 
                minY={0}
            >   
                <Layer width='80%' height='80%' position='middle center'>
                
                    <Handlers onClick={this.handleClick} optimized={false}>
                    <Animate _ease='bounce'>
                        <Bars 
                            colors={[color]}
                            innerPadding='0%'
                            groupPadding='0%'
                            barWidth='0%'
                            barAttributes={{
                                strokeLinejoin: 'round',
                                strokeWidth: 6,
                                stroke: color,
                                onClick: e => this.setCursorLocation(e)
                            }}
                        /> 
                        
                    </Animate>
                    </Handlers>
                    
                </Layer>
                </Chart>
            </div>
            )
    }
}

export default RoundBarChart


