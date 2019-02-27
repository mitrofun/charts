import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Chart, Layer, Animate, Handlers, Lines, Transform } from 'rumble-charts'
import ReactTooltip from 'react-tooltip'
import { _renderTooltipContent } from '../../common/charts'

import './style.css'


class LineChart extends Component {

    state = {
        _key: '',
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
            asArea,
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
                    scaleX={{paddingStart: 0, paddingEnd: 0}}
                    scaleY={{paddingTop: 10}}
                >   
                    <Layer width={layerWidth} height={layerHeight} position={layerPosition}>
                        <Handlers onMouseMove={this.setTooltipValue}>
                            <Animate>
                                <Transform method='stack'>
                                    <Lines 
                                        colors={[color]}
                                        asAreas={asArea} 
                                        lineAttributes={{
                                            onMouseMove: e => (showTooltip ? this.handleMouseMove(e) : null),
                                            onMouseLeave: e => (showTooltip ? this.handleMouseLeave(e): null)
                                        }}
                                    />
                                </Transform>
                            </Animate>
                        </Handlers>
                    </Layer>
                </Chart>
            </React.Fragment>
            )
    }
}

export default LineChart


LineChart.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    viewBox: PropTypes.string,
    color: PropTypes.string,
    series: PropTypes.array.isRequired,
    asAreas: PropTypes.bool,
    layerWidth: PropTypes.string,
    layerHeight: PropTypes.string,
    layerPosition: PropTypes.string,
    showTooltip: PropTypes.bool,
    tooltipOffset: PropTypes.object
}

LineChart.defaultProps = {
    className: '',
    layerWidth: '80%',
    layerHeight: '80%',
    layerPosition: 'middle center',
    tooltipOffset: {left: 10},
    showTooltip: false,
    renderTooltipContent: _renderTooltipContent

}