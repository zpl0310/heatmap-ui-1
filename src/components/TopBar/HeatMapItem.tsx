import * as React from 'react';
import RobotLabel from './RobotLabel';
import TimeFrame from './TimeFrame';

export interface HeatMapItemProps {
    
}
 
export interface HeatMapItemState {
    
}
 
class HeatMapItem extends React.Component<HeatMapItemProps, HeatMapItemState> {
    
    render() { 
        return ( 
            <div className="topMid">
                <div className="hmTimeFrameDiv">
                    <TimeFrame 
                        label="TimeFrame"
                        selection={["1","3","6"]}
                    />
                </div>              
                <RobotLabel
                    numRobot={100}
                    numML={40}
                />           
            </div>
        );
    }
}
 
export default HeatMapItem;