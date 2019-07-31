import * as React from 'react';
import TimeFrame from './TimeFrame'
import DatePicker from "react-datepicker";

import "../../assets/styles/datepicker.scss";
 
export interface CompareItemState {
    firstDate: Date
    secondDate: Date
}
 
class CompareItem extends React.Component<{}, CompareItemState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            firstDate: new Date(),
            secondDate: new Date(),
        }
    }

    handleFirstDateChange =( date: Date) => {
        this.setState({
            firstDate: date
        });
    }

    handleSecondDateChange =( date: Date) => {
        this.setState({
            secondDate: date
        });
    }

    render() { 
        return ( 
            <div className="topMid">
                <div className="topMidMid">
                    <div className="cmpFrameDiv">
                        <TimeFrame 
                            label="Time Frame"
                            selection={["1","2","3"]}
                        />
                    </div>
                    <div className="cmpFirstPeriod">
                        <label className="frameLabel"> First Period </label>
                        <br className="clear" />
                        <DatePicker
                            selected={this.state.firstDate}
                            onChange={this.handleFirstDateChange}
                            maxDate={new Date()}
                            showYearDropdown={true}
                        />
                    </div>
                    <div className="cmpSecondPeriod">
                        <label className="frameLabel"> Second Period </label>
                        <br className="clear" />
                        <DatePicker
                            selected={this.state.secondDate}
                            onChange={this.handleSecondDateChange}
                            maxDate={new Date()}
                            showYearDropdown={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CompareItem;
