import React from 'react'

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

export {_renderTooltipContent}