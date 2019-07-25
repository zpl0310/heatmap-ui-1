import * as React from 'react';
import TimeFrame from './TimeFrame'
import DatePicker from "react-datepicker";

import "../../assets/styles/datepicker.scss";

export interface CompareItemProps {
    
}
 
export interface CompareItemState {
    firstDate: Date
    secondDate: Date
}
 
class CompareItem extends React.Component<CompareItemProps, CompareItemState> {
    constructor(props: CompareItemProps) {
        super(props);
        this.state = {
            firstDate: new Date(),
            secondDate: new Date(),
        }
    }

    handleChange =( date: Date) => {
        this.setState({
            firstDate: date
        });
    }

    render() { 
        return ( 
            <div className="topMid">
                <div>
                    <TimeFrame 
                        label="Time Frame"
                        selection={["1","2","3"]}
                    />
                </div>
                <div>
                    <DatePicker
                        selected={this.state.firstDate}
                        onChange={this.handleChange}
                        maxDate={new Date()}
                        showYearDropdown={true}
                    />
                </div>
                <div>
                    <DatePicker
                        selected={this.state.firstDate}
                        onChange={this.handleChange}
                        maxDate={new Date()}
                        showYearDropdown={true}
                    />
                </div>
            </div>
        );
    }
}
 
export default CompareItem;
