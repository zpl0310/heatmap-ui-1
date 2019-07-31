import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import '../assets/styles/historychart.scss';
import HisChart from '../components/HistoryChart/HisChart'
import ControlBar from '../components/HistoryChart/ControlBar'
import { dispatchActions } from '../store/dispatch';
import { AppState } from '../store';
import { values } from 'd3';

type HistoryChartProps = {
}

type HistoryChartState = {
}

type OwnProps = {
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({ ...state, ...ownProps })
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof dispatchActions>


class HistoryChart extends Component<Props, HistoryChartState> {
    constructor(props: Props) {
        super(props);
    }
        
    render() {
        return (
            <div>
                <HisChart 
                    points={[
                        {
                            "date":new Date('Jan 17, 1995') ,
                            "value":6
                        },
                        {
                            "date":new Date('Feb 17, 1995') ,
                            "value":2
                        },
                        {
                            "date":new Date('Mar 17, 1995') ,
                            "value":3
                        },
                        {
                            "date":new Date('Apr 17, 1995') ,
                            "value":10
                        },
                        {
                            "date":new Date('May 17, 1995') ,
                            "value":8
                        },
                        {
                            "date":new Date('Jun 17, 1995') ,
                            "value":20
                        },
                        {
                            "date":new Date('Jul 17, 1995') ,
                            "value":16
                        },
                        {
                            "date":new Date('Aug 17, 1995') ,
                            "value":7
                        },
                        {
                            "date":new Date('Sept 17, 1995') ,
                            "value":1
                        },
                        {
                            "date":new Date('Oct 17, 1995') ,
                            "value":6
                        },
                        {
                            "date":new Date('Nov 17, 1995') ,
                            "value":3
                        },
                        {
                            "date":new Date('Dec 17, 1995') ,
                            "value":2
                        },
                    ]}
                />
                <ControlBar />
            </div>
        );
    }
}

export default connect(mapStateToProps, dispatchActions) (HistoryChart);