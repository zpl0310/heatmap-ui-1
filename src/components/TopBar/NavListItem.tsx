import * as React from 'react';

export interface NavListItemProps {
    name: string
}
 
export interface NavListItemState {
    
}
 
class NavListItem extends React.Component<NavListItemProps, NavListItemState> {
    
    render() { 
        return (  
            <div className="navs">
                <label>{this.props.name}</label>
            </div>
        );
    }
}
 
export default NavListItem;