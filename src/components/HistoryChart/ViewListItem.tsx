import * as React from 'react';

import Switch from '@material-ui/core/Switch';

export interface ViewListItemProps {
    label: string
    checked: boolean
}
 
export interface ViewListItemState {
    checked: boolean
}
 
class ViewListItem extends React.Component<ViewListItemProps, ViewListItemState> {
    constructor(props: ViewListItemProps) {
        super(props);
        this.state = {
            checked: this.props.checked
        }
    }

   handleChange = () => {
       this.setState({
           checked: !this.state.checked
       })
       console.log(this.state.checked)
   }

    render() { 

        return (  
            <div>
                <span className="viewSpan"> {this.props.label} </span>
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    value="checkedB"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
        );
    }
}
 
export default ViewListItem;