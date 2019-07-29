import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import '../assets/styles/heatmap.scss';
import Map from '../components/map/Map';
import { RobotStatus, RobotMap } from '../definitions';
import { RobotStatePositionCache } from '../components/map/robotStreamCache';
import { DEV_MAP_ID, DEV_TOKEN, DEV_INSTANCE } from '../components/map/constants';
import { statusFromLocalization } from '../components/map/utils';
import { AppState } from '../store';

type LiveMapProps = {
}

type LiveMapState = {
    robots: RobotMap
}

const initialState = {
    robots: {},
}

const mapStateToProps = (state: AppState) => ({ robots: state.heatMap.robots })
type Props = ReturnType<typeof mapStateToProps>

class LiveMap extends Component<Props, LiveMapState> {
    private ws!: WebSocket
    readonly state: LiveMapState = initialState

    componentDidMount() {
        this.setState({ robots: Object.assign({}, this.props.robots) })
        // TODO: Determine map from route
        // TODO: Move websocket logic to its own component?
        this.ws = new WebSocket(`ws://${DEV_INSTANCE}/api/v1/streams/maps/${DEV_MAP_ID}/robots/`)
        this.ws.onopen = this.handleWSOpen
        this.ws.onclose = this.handleWSClose
        this.ws.onmessage = this.handleWSMessage
        this.ws.onerror = this.handleWSError
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({ robots: Object.assign({}, nextProps.robots) })
    }

    handleWSOpen = (ev: Event) => {
        console.log('websocket opened')
        //setTimeout(() => this.ws.close(), 1000)
    }

    handleWSClose = (ev: Event) => {
        console.log('websocket closed')
    }

    handleWSMessage = (ev: MessageEvent) => {
        let obj = JSON.parse(ev.data)
        let data = obj.payload.data
        let name = data.robot || data.name
        let robot = this.state.robots[name]

        // Initialize robot if a new one pops up
        if (!robot) {
            robot = {
                name,
                status: RobotStatus.Idle,
                pose: { x: 0, y: 0, theta: 0 }
            }
        }

        let updatedRobot = Object.assign({}, robot)

        if (obj.stream === 'robot-states') {
            updatedRobot.pose = data.current_pose
            const timestamp = performance.now()
            RobotStatePositionCache.updatePositionForRobot(
                updatedRobot.name,
                updatedRobot.pose,
                timestamp,
            )
        } else if (obj.stream === 'robots') {
            updatedRobot.status = statusFromLocalization(data.status, data.localized)
        }

        this.setState(prevState => ({
            robots: {
                ...prevState.robots,
                [data.robot]: updatedRobot
            }
        }))
    }

    handleWSError = (ev: Event) => {
        console.log('websocket error: ')
        console.log(ev)
        //TODO: Proper error handling
    }

    render() {
        return (
            <div>
                <Map
                    showRobots
                    robots={this.state.robots}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(LiveMap);