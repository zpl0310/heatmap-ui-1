import * as React from 'react';

export interface InstanceListItemProps {
    //changeInstance: Function,
    name: string,
    changeSidebarView: Function
}
 
export interface InstanceListItemState {
    
}
 
class InstanceListItem extends React.Component<InstanceListItemProps, InstanceListItemState> {
    // constructor(props: InstanceListItemProps) {
    //     super(props);
    // }
    handleClick =() => {
        this.props.changeSidebarView() 
    }
    render() { 
    
        return (  
            <li 
                onClick = {this.handleClick}
            >
                {this.props.name}
            </li>
        );
    }
}
 
export default InstanceListItem;