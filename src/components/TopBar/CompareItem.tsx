import * as React from 'react';
import TimeFrame from './TimeFrame'

export interface CompareItemProps {
    
}
 
export interface CompareItemState {
    
}
 
class CompareItem extends React.Component<CompareItemProps, CompareItemState> {

    render() { 
        return ( 
            <div>
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