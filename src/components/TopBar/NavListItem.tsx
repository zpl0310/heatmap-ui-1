import * as React from 'react';

export interface NavListItemProps {
    name: string
    curNav: string
    onNavChange: Function
}
 
export interface NavListItemState {
    
}
 
class NavListItem extends React.Component<NavListItemProps, NavListItemState> {
    handleClick = (s:string) => {
        this.props.onNavChange(s)
    }

    getClassName = (s:string) => {
        return s===this.props.curNav?"curNav":"navs"
    }
    
    render() { 
        return (  
            <div  
                onClick={()=>this.handleClick(this.props.name)}
                className={this.getClassName(this.props.name)}
                >
                <label>{this.props.name}</label>
            </div>
        );
    }
}
 
export default NavListItem;