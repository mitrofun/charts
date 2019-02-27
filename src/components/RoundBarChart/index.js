import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Chart, Bars, Layer, Animate, Handlers } from 'rumble-charts'
import ReactTooltip from 'react-tooltip'

import './style.css'

function _renderTooltipContent(chartColor, chartX, chartY) {
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
        <div style={{
            display: 'inline-block',
            marginRight: 6
        }}>{chartX}</div>
        <div style={{
            display: 'inline-block',
            border: '1px solid gray',
            borderRadius: 4,
            paddingLeft: 3,
            paddingRight: 3
        }}>{chartY}</div>
    </React.Fragment>)
}

class RoundBarChart extends Component {
    state = {
        _key: '',
        _showTooltip: false,
        _clickBar: false,
        chartX: 0,
        chartY: 0
    }


    setTooltipValue = ({closestPoints}) => {
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
            chartX,
            chartY
        })
    }

    componentDidMount() {
        this.setState ({
            _key:(Math.random()*1e10).toString(36).split('.')[0]
        })
    }

    handleMouseMove(e) {
        ReactTooltip.rebuild()
        const {_key} = this.state
        e.target.setAttribute('data-tip', true)
        e.target.setAttribute('data-for', `bar-tooltip-${_key}`)
    }

    handleMouseLeave(e) {
        ReactTooltip.rebuild()
        e.target.removeAttribute('data-tip')
        e.target.removeAttribute('data-for')
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
            renderTooltipContent
        } = this.props
        const { 
            _key,
            chartX,
            chartY 
        } = this.state

        const tooltip = showTooltip ?
            <div className='chart-tooltip__wrapper'>
            <ReactTooltip 
                className={`chart-tooltip ${className}`}
                offset={tooltipOffset}
                place={'right'}
                type={'light'}
                id={`bar-tooltip-${_key}`}
                getContent={()=>renderTooltipContent(color, chartX, chartY)}
            />
            </div> : null
        return (
            <React.Fragment>
                { tooltip }
                <Chart 
                    viewBox={viewBox}
                    series={series} 
                    minY={0}
                >   
                    <Layer width={layerWidth} height={layerHeight} position={layerPosition}>
                        <Handlers onMouseMove={this.setTooltipValue}>
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
                                        onMouseMove: e => (showTooltip ? this.handleMouseMove(e) : null),
                                        onMouseLeave: e => (showTooltip ? this.handleMouseLeave(e): null)
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
    tooltipOffset: PropTypes.object,
    renderTooltipContent: PropTypes.func
}

RoundBarChart.defaultProps = {
    className: '',
    layerWidth: '80%',
    layerHeight: '80%',
    layerPosition: 'middle center',
    tooltipOffset: {left: 10},
    showTooltip: false,
    renderTooltipContent: _renderTooltipContent
}