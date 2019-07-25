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
            <div className="labelMidLayer">
                <div className="numRobot">
                    <label className="num"> {numRobot} </label>
                    <br className="clear" />
                    <label> Robots </label>
                </div>
                <div className="numML">
                    <label className="num"> {numML} per Day</label>
                    <br className="clear" />
                    <label> Mislocalizations </label>
                </div>
            </div>
        );
    }
}
 
export default RobotLabel;