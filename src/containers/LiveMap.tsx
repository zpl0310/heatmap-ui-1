import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/heatmap.scss';
import Map from '../components/map/Map';
import { Robot, RobotStatus } from '../definitions';

type LiveMapProps = {
}

type LiveMapState = {
    robots: Object
}

const initialState = {
    robots: {},
}


class LiveMap extends Component<LiveMapProps, LiveMapState> {
    private ws: WebSocket
    readonly state: LiveMapState = initialState

    constructor(props: LiveMapProps) {
        super(props)

        // TODO: Determine map from route
        this.ws = new WebSocket("ws://localhost:8888/api/v1/streams/maps/3/robots/")
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

        if (obj.stream === 'robot-states') {
            let robotData: Robot = {
                id: data.id,
                pose: data.current_pose,
                status: RobotStatus.Working
            }
            this.setState(prevState => ({
                robots: {
                    ...prevState.robots,
                    [data.id]: robotData
                }
            }))
            // TODO: Robot states in Redux?
        }
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
                    robots={this.state.robots}
                />
            </div>
        );
    }
}

export default LiveMap;