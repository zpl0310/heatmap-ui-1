import * as React from 'react';

export interface RobotLabelProps {
    numRobot: number,
    numML: number,
}
 
export interface RobotLabelState {
    
}
 
class RobotLabel extends React.Component<RobotLabelProps, RobotLabelState> {
    
    render() { 
        const { numRobot, numML } = this.props
        return ( 
            <div>
                <div>
                    <label> {numRobot} </label>
                    <label> Robots </label>
                </div>
                <div>
                    <label> {numML} </label>
                    <label> Mislocalizations per Day </label>
                </div>
            </div>
        );
    }
}
 
export default RobotLabel;