import * as React from 'react';
import { Component } from 'react';
import '../assets/styles/heatmap.scss';
import Map from '../components/map/Map';
import { Texture } from 'pixi.js';
import * as PIXI from 'pixi.js'

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
        this.ws = new WebSocket("ws://localhost:8888/api/v1/streams/maps/2/robots/")
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
            this.setState(prevState => ({
                robots: {
                    ...prevState.robots,
                    [data.id]: data.current_pose
                }
            }))
        }
    }

    handleWSError = (ev: Event) => {
        console.log('websocket error: ')
        console.log(ev)
    }

    render() {
        return (
            <div>
                <Map
                    robots={this.state.robots}
                    mapTexture={PIXI.Texture.from('../assets/testmap.png')}
                />
            </div>
        );
    }
}

export default LiveMap;