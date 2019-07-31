import * as React from 'react';
import InstanceListItem from './InstanceListItem';
import SearchBox from './SearchBox';
import '../../assets/styles/sidebar.scss';
import { Instance } from '../../definitions/index'

export interface InstanceListProps {
    changeSidebarView: Function
    onChangeInstance: Function
    instanceNameList: Instance[],
}

export interface InstanceListState {
    curFilter: string
}

class InstanceList extends React.Component<InstanceListProps, InstanceListState> {
    constructor(props: InstanceListProps) {
        super(props);
        this.state = {
            curFilter: ""
        }
    }

    handleInput = (input: string) => {
        this.setState({
            curFilter: input
        })
    }

    render() {

        const curNameList = this.props.instanceNameList.filter(
            ins => {
                return ins.name.toLowerCase().startsWith(this.state.curFilter.toLowerCase());
            }
        );


        const instanceList = curNameList.map((ins) => (
            <InstanceListItem
                key={ins.name}
                name={ins.name}
                onChangeInstance={this.props.onChangeInstance}
                changeSidebarView={this.props.changeSidebarView}
            />
        ))

        return (
            <div>
                <div className="selectLabel">
                    <label>Select an instance</label>
                    <div className="searchBox">
                        <SearchBox
                            handleInput={this.handleInput}
                        />
                    </div>
                </div>

                <ul className="list">
                    {instanceList}
                </ul>
            </div>
        );
    }
}

export default InstanceList;