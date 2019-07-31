import * as React from 'react';

export interface NavListItemProps {
    name: string
    curNav: string
    onNavChange: Function
}
 
class NavListItem extends React.Component<NavListItemProps, {}> {
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
                {this.props.name}
            </div>
        );
    }
}
 
export default NavListItem;