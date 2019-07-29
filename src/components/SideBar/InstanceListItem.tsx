import * as React from 'react';

export interface InstanceListItemProps {
    //changeInstance: Function,
    name: string,
    changeSidebarView: Function
    onChangeInstance: Function
}

export interface InstanceListItemState {

}

class InstanceListItem extends React.Component<InstanceListItemProps, InstanceListItemState> {
    // constructor(props: InstanceListItemProps) {
    //     super(props);
    // }
    handleClick = () => {
        this.props.changeSidebarView()
        this.props.onChangeInstance(this.props.name)
    }
    render() {

        return (
            <li
                onClick={this.handleClick}
            >
                <div>
                    {this.props.name}
                </div>
            </li>
        );
    }
}

export default InstanceListItem;