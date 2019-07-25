import * as React from 'react';

export interface NavListItemProps {
    name: string
    onNavChange: Function
}
 
export interface NavListItemState {
    
}
 
class NavListItem extends React.Component<NavListItemProps, NavListItemState> {
    handleClick = (s:string) => {
        this.props.onNavChange(s)
    }
    
    render() { 
        return (  
            <div className="navs" onClick={()=>this.handleClick(this.props.name)}>
                <label>{this.props.name}</label>
            </div>
        );
    }
}
 
export default NavListItem;