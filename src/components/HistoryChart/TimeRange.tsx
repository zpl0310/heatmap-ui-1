import * as React from 'react';
import TimeFrame from '../TopBar/TimeFrame';
import DatePicker from "react-datepicker";

export interface TimeRangeProps {
    
}
 
export interface TimeRangeState {
    firstDate: Date
    secondDate: Date
}
 
class TimeRange extends React.Component<TimeRangeProps, TimeRangeState> {
    
    constructor(props: TimeRangeProps) {
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
            <div>
                <div className="startDate">
                    <span className="dateLabel">
                        <label>Start Date</label>
                    </span>
                    <DatePicker
                        selected={this.state.firstDate}
                        onChange={this.handleFirstDateChange}
                        maxDate={new Date()}
                        showYearDropdown={true} 
                    />
                </div>
                <div className="endDate">
                    <span className="dateLabel">
                        <label>End Date</label>
                    </span>
                    <DatePicker 
                        selected={this.state.firstDate}
                        onChange={this.handleFirstDateChange}
                        maxDate={new Date()}
                        showYearDropdown={true}
                    />
                </div>
                <div className="timeFrmae">
                    <TimeFrame 
                        label="Time Frame"
                        selection={["1","6","12"]}
                    />
                </div>
            </div>
        );
    }
}

export default TimeRange;