import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/heatmap.scss';
import Map from '../components/map/Map';
import { RobotStatus, RobotMap } from '../definitions';
import { RobotStatePositionCache } from '../components/map/robotStreamCache';
import axios from 'axios'
import { DEV_MAP_ID, DEV_TOKEN, DEV_INSTANCE } from '../components/map/constants';
import { statusFromLocalization } from '../components/map/utils';

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
    try {
        let res = await axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/robots/?page=${page}`, {
            headers: { 'Authorization': DEV_TOKEN },
        })

        res.data.results.forEach((robot: any) => {
            if (!results[robot.name]) {
                results[robot.name] = {
                    name: robot.name,
                    status: statusFromLocalization(robot.status, robot.localized),
                    pose: { x: 0, y: 0, theta: 0 }
                }
            }
        })


        let statesRes = await axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/robots/states/?page=${page}`, {
            headers: { 'Authorization': DEV_TOKEN },
        })
        statesRes.data.results.forEach((robot: any) => {
            if (results[robot.robot]) {
                results[robot.robot].pose = robot.current_pose
                RobotStatePositionCache.updatePositionForRobot(
                    robot.robot,
                    robot.current_pose,
                    performance.now(),
                )
            }
        })

        if (res.data.next) {
            return getRobotStates(id, page + 1, results)
        }

        return results
    } catch(err) {
        // TODO: Proper error handling (redux)
        console.log(err)
        return {}
    }
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
        let robot = this.state.robots[data.robot]

        // Initialize robot if a new one pops up
        if (!robot) {
            robot = {
                name: data.robot,
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

export default LiveMap;