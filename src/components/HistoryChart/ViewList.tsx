import * as React from 'react';

import ViewListItem from './ViewListItem'

export interface ViewListProps {
    
}
 
export interface ViewListState {

}
 
class ViewList extends React.Component<ViewListProps, ViewListState> {

    render() { 
        const labels = ["Mislocalization Rate","Average Battery Level","Average Wifi Signals"]
        const viewList = labels.map((label)=>(
            <ViewListItem
                label={label}
                checked={false}
            />
        ))
        return (  
            <div>
                {viewList}
            </div>
        );
    }
}
 
export default ViewList;