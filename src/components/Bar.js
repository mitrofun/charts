import React, {Component} from 'react'
import { Chart, Bars } from 'rumble-charts'

const series = [{
    data: [11, 22, 34, 42, 45, 67, 53, 44, 32, 22, 34]
}];

class MyChart extends Component {
    render() {
        return (
        <Chart 
            width={300} 
            height={100}
            series={series} 
            minY={0}
        >
            <Bars 
                colors={['#5D88FC']}
                innerPadding='2%'
                barWidth='4%'
                barStyle={{ borderRadius:4}}
            />
        </Chart>)
    }
}

export default MyChart


