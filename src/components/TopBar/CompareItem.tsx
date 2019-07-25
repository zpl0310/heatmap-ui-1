import * as React from 'react';
import TimeFrame from './TimeFrame'


export interface CompareItemProps {
    
}
 
export interface CompareItemState {
    startDate: Date
}
 
class CompareItem extends React.Component<CompareItemProps, CompareItemState> {

    handleChange =( date: Date) => {
        this.setState({
            startDate: date
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
            </div>
        );
    }
}
 
export default CompareItem;