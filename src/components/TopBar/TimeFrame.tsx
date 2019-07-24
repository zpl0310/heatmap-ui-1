import * as React from 'react'


export interface TimeFrameProps {
    label: string,
    selection: string[],
}
 
export interface TimeFrameState {
    curInterval: string
    show: boolean
}
 
class TimeFrame extends React.Component<TimeFrameProps, TimeFrameState> {
    constructor(props: TimeFrameProps) {
        super(props);
        this.state = {
            curInterval: this.props.selection[0],
            show: false,
        }
    }

    handleBtnClick = () => {
        this.setState({
            show: true
        })
    }

    handleLiClick = () => {
        this.setState ({
            show: false,
            curInterval: '1'
        })
    }


    render() { 
        const { show, curInterval } = this.state
        const { selection, label } = this.props


        const list = selection.filter(num => {return num != curInterval}).map((num)=>(
            <li key={num}> {num} {num==='1'? 'Month':'Months'} </li>
        ))

        let display = (<div />)

        if (show) {
            display = (
                <div>
                    <ul>
                        {list}
                    </ul>
                </div>
            )
        }


        return (
            <div>
                <div>
                    <label> {label} </label>
                </div>
                <button onClick={this.handleBtnClick}>{curInterval} Month</button>
                {display}
            </div>
        );
    }
}
 
export default TimeFrame;