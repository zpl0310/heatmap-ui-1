import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
//import Plot from 'react-plotly.js';


type HisChartProps = {
}

type HisChartState = {
   
}


class HisChart extends React.Component<HisChartProps, HisChartState> {

    public handleClick = (evt: any) => {}
    public handleHover = (evt: any) => {}

    render() {
        const data = [
            {
                marker: {
                    color: 'rgb(16, 32, 77)'
                },
                name: 'Trending',
                type: 'scatter',
                x: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                y: [6, 2, 3, 10, 8, 20, 16, 7, 1, 6, 3, 2]
            },
            {
                name: 'Mislocalizations',
                type: 'bar',
                x: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                y: [6, 2, 3, 10, 8, 20, 16, 7, 1, 6, 3, 2]
            }
        ];
        const layout = {
            // annotations: [
            //     {
            //         x: 0,
            //         xref: 'paper',
            //         y: 0,
            //         yref: 'paper'
            //     }
            // ],
            title: 'Mislocalizations Over Time',
            xaxis: {
                title: 'time'
            },
        };

        return (               
            <PlotlyChart 
                data={data}
                layout={layout}
                onClick={this.handleClick}
                onHover={this.handleHover}
            />
            );
        }
    
}

export default HisChart;