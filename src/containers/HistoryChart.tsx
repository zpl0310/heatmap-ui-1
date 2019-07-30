import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/historychart.scss';
import HisChart from '../components/HistoryChart/HisChart'
import ControlBar from '../components/HistoryChart/ControlBar'

type HistoryChartProps = {
}

type HistoryChartState = {

}


class HistoryChart extends Component<HistoryChartProps, HistoryChartState> {
    constructor(props: HistoryChartProps) {
        super(props);
    }
        
    render() {
        return (
            <div>
                <HisChart />
                <ControlBar />
            </div>
        );
    }
}

export default HistoryChart;