import * as React from 'react'
import { Component, RefObject } from 'react'
import { Application, Container, Loader, Sprite, Ticker } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import * as TWEEN from '@tweenjs/tween.js';

import { WORLD_OPTIONS, CENTER_ANCHOR, MAX_FPS } from './constants'
import '../../assets/styles/heatmap.scss'
import RobotLayer from './RobotLayer';
import map from '../../assets/testmap.png' // TODO: Get map image from Redux
import robot from '../../assets/freight100.png' // TODO: Figure out why SVG loading doesn't work

type MapProps = {
    robots: Object
    mapPath: string
}

class Map extends Component<MapProps, {}> {
    private parentContainer!: RefObject<HTMLDivElement>
    private renderer!: RefObject<HTMLCanvasElement>
    private viewport!: Viewport
    private world!: Container
    private robotLayer!: RobotLayer
    private application!: Application

    constructor(props: MapProps) {
        super(props)

        this.parentContainer = React.createRef()
        this.renderer = React.createRef()
    }

    handleResize() {
        this.application.renderer.resize(window.innerWidth, window.innerHeight);
        this.viewport.resize(window.innerWidth, window.innerHeight);
    }

    componentDidMount() {
        const rendererCanvas = this.renderer.current
        const parentContainerDiv = this.parentContainer.current

        if (!rendererCanvas || !parentContainerDiv) {
            throw new Error('Invalid DOM Composition. Missing map DOM elements')
        }

        // Application setup
        this.application = new Application({
            view: rendererCanvas,
            width: parentContainerDiv.clientWidth,
            height: parentContainerDiv.clientHeight,
            antialias: false,
            resolution: 1,
            backgroundColor: 0x999999,
        })

        window.addEventListener("resize", () => {
            this.handleResize();
        })

        // Viewport setup
        this.viewport = new Viewport({
            screenWidth: window.innerHeight,
            screenHeight: window.innerHeight,
            worldWidth: WORLD_OPTIONS.width,
            worldHeight: WORLD_OPTIONS.height,
            interaction: this.application.renderer.plugins.interaction
        })

        this.viewport
            .drag({ clampWheel: true, direction: "all", underflow: "center" })
            .pinch({ noDrag: true })
            .clamp({ direction: "all" })
            .zoom(WORLD_OPTIONS.width - window.innerWidth, true)
            .wheel({ smooth: 10 })
            .clampZoom({
                maxHeight: WORLD_OPTIONS.height * 1.5,
                minHeight: window.innerHeight / 2,
                maxWidth: WORLD_OPTIONS.width * 1.5,
                minWidth: window.innerWidth / 2
            })

        this.world = new Container()

        // Add viewport and world to stage
        this.application.stage.addChild(this.viewport)
        this.viewport.addChild(this.world)
        this.handleResize()

        // Robot layer setup
        this.robotLayer = new RobotLayer()

        // Load necessary resources
        Loader.shared
            .add('robot', robot)
            .add('map', map)
            .load(() => this.startApp())
    }

    startApp() {
        // Map layer setup
        const mapSprite = new Sprite(Loader.shared.resources['map'].texture)
        mapSprite.anchor = CENTER_ANCHOR
        mapSprite.position.set(WORLD_OPTIONS.width / 2, WORLD_OPTIONS.height / 2)

        // Add layers to world
        this.world.addChild(mapSprite)
        this.world.addChild(this.robotLayer)

        this.application.start()
        this.application.ticker.maxFPS = MAX_FPS
        this.application.ticker.add(() => {
            this.robotLayer.load(this.props.robots, this.application.ticker.deltaMS)
            TWEEN.update(this.application.ticker.lastTime)
        })
    }

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