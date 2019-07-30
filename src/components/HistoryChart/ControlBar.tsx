import * as React from 'react';
import ViewList from './ViewList';
import TimeRange from './TimeRange';

export interface ControlBarProps {
    
}
 
export interface ControlBarState {
    
}
 
class ControlBar extends React.Component<ControlBarProps, ControlBarState> {

    render() { 
        return (  
            <div className="controlContainer">
                <div className="leftControl">
                    <label className="controlLabel">View List</label>
                    <ViewList />
                </div>
                <div className="rightControl"> 
                    <label className="controlLabel">Time Range</label>             
                    <TimeRange />
                </div>
            </div>
        );
    }
}
 
export default ControlBar;