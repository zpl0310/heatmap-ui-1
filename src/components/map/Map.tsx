import * as React from 'react';
import { Component, RefObject } from 'react';
import Robot from './Robot';
import { STAGE_OPTIONS, ROBOT_SIZE, MAP_PIXEL_RATIO } from './constants'
import { Texture, Application, Container, Sprite } from 'pixi.js';
import '../../assets/styles/heatmap.scss'

type MapProps = {
    robots: Object | null
    mapTexture: Texture
}

class Map extends Component<MapProps, {}> {
    private parentContainer!: RefObject<HTMLDivElement>
    private renderer!: RefObject<HTMLCanvasElement>
    private application!: Application

    constructor(props: MapProps) {
        super(props)

        this.parentContainer = React.createRef()
        this.renderer = React.createRef()
    }

    componentDidMount() {
        const rendererCanvas = this.renderer.current
        const parentContainerDiv = this.parentContainer.current

        if (!rendererCanvas || !parentContainerDiv) {
            throw new Error('Invalid DOM Composition. Missing map DOM elements')
        }

        this.application = new Application({
            view: rendererCanvas,
            width: parentContainerDiv.clientWidth,
            height: parentContainerDiv.clientHeight,
            antialias: false,
            resolution: 1,
            backgroundColor: 0x999999,
        })

        this.application.start()
    }

    shouldComponentUpdate(nextProps: MapProps) {
        return true
    }

    componentDidUpdate() {
        this.application.stage.removeChildren()

        const container = this.application.stage.addChild(
            new Container(),
        ) as Sprite

        if (this.props.robots) {
            for (let robot of Object.entries(this.props.robots)) {
                let robotOptions = {
                    x: robot[1].x / MAP_PIXEL_RATIO,
                    y: robot[1].y / MAP_PIXEL_RATIO,
                    size: ROBOT_SIZE,
                    rotation: robot[1].theta
                }
                const sprite = Robot(robotOptions)
                container.addChild(sprite)
            }
        }
    }

    /*renderRobots() {
        let robots = []
        if (this.props.robots) {
            for (let robot of Object.entries(this.props.robots)) {
                let robotOptions = {
                    x: robot[1].x / MAP_PIXEL_RATIO,
                    y: robot[1].y / MAP_PIXEL_RATIO,
                    size: ROBOT_SIZE,
                    rotation: robot[1].theta
                }
                robots.push(<Robot key={robot[0]} {...robotOptions} />)
            }
        }
        return robots
    }*/

    render() {
        return (
            <div
                id="fetch-map-container"
                data-cy="fetch-map-container"
                ref={this.parentContainer}
            >
                <canvas
                    id="renderer"
                    data-cy="fetch-map-canvas"
                    ref={this.renderer}
                />
            </div>
        );
    }
}

export default Map