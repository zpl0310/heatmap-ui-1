import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';
import { ChartPoint } from '../../definitions';

type HisChartProps = {
    points: ChartPoint[]
}

class HisChart extends React.Component<HisChartProps, {}> {

    public handleClick = (evt: any) => {}
    public handleHover = (evt: any) => {}

    render() {
        let labels = this.props.points.map(point=>point.date)
        let values = this.props.points.map(point=>point.value)

        const data = [
            {
                marker: {
                    color: 'rgb(16, 32, 77)'
                },
                name: 'Trending',
                type: 'scatter',
                x: labels,
                y: values,
            },
            {
                name: 'Mislocalizations',
                type: 'bar',
                x: labels,
                y: values,
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