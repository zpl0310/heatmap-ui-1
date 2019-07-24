import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/heatmap.scss';
import Map from '../components/map/Map';
import { Robot, RobotStatus, RobotMap } from '../definitions';
import { RobotStatePositionCache } from '../components/map/robotStreamCache';
import axios, { AxiosResponse } from 'axios'
import { DEV_MAP_ID, DEV_TOKEN, DEV_INSTANCE } from '../components/map/constants';

type LiveMapProps = {
}

type LiveMapState = {
    robots: RobotMap
}

const initialState = {
    robots: {},
}

// Fetches all initial robot states, recursing to cover each page
// TODO: Move to a Redux action and store in state
export async function getRobotStates(id: number, page: number = 1, results: RobotMap = {}): Promise<RobotMap> {
    return axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/robots/?page=${page}`, {
        headers: { 'Authorization': DEV_TOKEN },
    }).then((res: AxiosResponse) => {
        res.data.results.forEach((robot: Robot) => {
            if (!results[robot.id]) {
                results[robot.id] = {
                    id: robot.id,
                    status: robot.status,
                    pose: {x: 0, y: 0, theta: 0}
                }
            }
        })

        if (res.data.next) {
            return getRobotStates(id, page + 1, results)
        }
        return results
    }).catch((err: Error) => {
        // TODO: Proper error handling
        console.log(err)
        return {}
    })
}
class LiveMap extends Component<LiveMapProps, LiveMapState> {
    private ws!: WebSocket
    readonly state: LiveMapState = initialState

    async componentDidMount() {
        this.setState({ robots: await getRobotStates(DEV_MAP_ID) })

        // TODO: Determine map from route
        // TODO: Move websocket logic to its own component?
        this.ws = new WebSocket(`ws://${DEV_INSTANCE}/api/v1/streams/maps/${DEV_MAP_ID}/robots/`)
        this.ws.onopen = this.handleWSOpen
        this.ws.onclose = this.handleWSClose
        this.ws.onmessage = this.handleWSMessage
        this.ws.onerror = this.handleWSError
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
        let robot = this.state.robots[data.id]

        // Initialize robot if a new one pops up
        if (!robot) {
            robot = {
                id: data.id,
                status: RobotStatus.Idle,
                pose: { x: 0, y: 0, theta: 0 }
            }
        }

        let updatedRobot = Object.assign({}, robot)

        if (obj.stream === 'robot-states') {
            updatedRobot.pose = data.current_pose
            const timestamp = performance.now()
            RobotStatePositionCache.updatePositionForRobot(
                updatedRobot.id,
                updatedRobot.pose,
                timestamp,
            )
        } else if (obj.stream === 'robots') {
            updatedRobot.status = data.status
        }

        this.setState(prevState => ({
            robots: {
                ...prevState.robots,
                [data.id]: updatedRobot
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

export default LiveMap;