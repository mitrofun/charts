import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Chart, Bars, Layer, Animate, Handlers } from 'rumble-charts'

import './style.css'


const tooltipStyle = {
    background: '#FFF',
    border: '1px solid #FFF',
    borderRadius: 5,
    boxShadow: '3px 4px 12px rgba(128, 141, 173, 0.41)',
    padding: '2px 6px'
}

class RoundBarChart extends Component {
    state = {
        _showTooltip: false,
        cursor: [0, 0],
        chartX: 0,
        chartY: 0
    }

    handleClick = ({closestPoints}) => {
        const {showTooltip} = this.props
        if (!showTooltip) {
            return
        }

        const closest = closestPoints[0]
        if (!closest) {
            return
        }

        const { point: {x: chartX, y: chartY} } = closest
        this.setState({
            _showTooltip: true,
            chartX,
            chartY
        })
    }

    setCursorLocation = event => {
        const {clientX, clientY} = event
        const cursor = [clientX, clientY]
        this.setState({
            cursor
        })
    }


    render() {
        const { 
            className, 
            series, 
            color, 
            viewBox,
            layerWidth,
            layerHeight,
            layerPosition,
            showTooltip,
            tooltipOffset,
            tooltipStyle
        } = this.props
        const { 
            _showTooltip, 
            cursor,
            chartX,
            chartY 
        } = this.state

        const TooltipContent = 
        <React.Fragment><div style={{
            display: 'inline-block',
            background: color,
            borderRadius: 50,
            verticalAlign: 'middle',
            marginRight: 6,
            width: 4,
            height: 4
            }} />
            <span>{chartX}</span>
            <span>{chartY}</span>
        </React.Fragment>

        const tooltip = showTooltip && _showTooltip && cursor[0] !== 0 ? 
            <div 
                className={`chart-tooltip ${className}`}
                style={{
                    position: 'fixed',
                    left: cursor[0] + tooltipOffset[0], 
                    top: cursor[1] + tooltipOffset[1],
                    verticalAlign: 'middle',
                    ...tooltipStyle
                }
            }>{TooltipContent}</div> 
            : null
        return (
            <React.Fragment>
                {tooltip}
                <Chart 
                    viewBox={viewBox}
                    series={series} 
                    minY={0}
                >   
                    <Layer width={layerWidth} height={layerHeight} position={layerPosition}>
                        <Handlers onClick={this.handleClick}>
                            <Animate>
                                <Bars 
                                    colors={[color]}
                                    innerPadding='0%'
                                    groupPadding='0%'
                                    barWidth='0%'
                                    barAttributes={{
                                        strokeLinejoin: 'round',
                                        strokeWidth: 6,
                                        stroke: color,
                                        onClick: e => (showTooltip ? this.setCursorLocation(e) : null)
                                    }}
                                /> 
                            </Animate>
                        </Handlers>
                    </Layer>
                </Chart>
            </React.Fragment>
            )
    }
}

export default RoundBarChart


RoundBarChart.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    viewBox: PropTypes.string,
    color: PropTypes.string,
    series: PropTypes.array.isRequired,
    layerWidth: PropTypes.string,
    layerHeight: PropTypes.string,
    layerPosition: PropTypes.string,
    showTooltip: PropTypes.bool,
    tooltipOffset: PropTypes.array,
    tooltipStyle: PropTypes.object
}

RoundBarChart.defaultProps = {
    layerWidth: '80%',
    layerHeight: '80%',
    layerPosition: 'middle center',
    tooltipOffset : [0, 0],
    tooltipStyle: tooltipStyle,
    showTooltip: false,
}