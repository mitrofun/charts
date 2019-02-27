import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Chart, Layer, Animate, Handlers, Lines, Transform } from 'rumble-charts'
import './style.css'

class LineChart extends Component {

    render() {
        const { 
            className, 
            series, 
            color, 
            viewBox,
            layerWidth,
            layerHeight,
            layerPosition
        } = this.props


        return (
            <React.Fragment>
                <Chart 
                    viewBox={viewBox}
                    series={series} 
                    minY={0}
                    scaleX={{paddingStart: 0, paddingEnd: 0}}
                    scaleY={{paddingTop: 10}}
                >   
                    <Layer width={layerWidth} height={layerHeight} position={layerPosition}>
                        <Handlers>
                            <Animate>
                                <Transform method='stack'>
                                    <Lines 
                                        colors={[color]}
                                        asAreas={true} 
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
    showTooltip: false

}