import * as React from 'react';

export interface MapListItemProps {
    name: string
}
 
export interface MapListItemState {
    
}
 
class MapListItem extends React.Component<MapListItemProps, MapListItemState> {
    // constructor(props: MapListItemProps) {
    //     super(props);
    // }
    render() { 
        return (  
            <li 
                //onClick = {this.props.changeInstance()}
            >
                {this.props.name}
            </li>
        );
    }
}
 
export default MapListItem;