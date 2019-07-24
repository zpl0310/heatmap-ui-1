import * as React from 'react'
import { Component, RefObject } from 'react'
import { Application, Container, Loader, Sprite, TextureLoader } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { CENTER_ANCHOR, MAX_FPS } from './constants'
import '../../assets/styles/heatmap.scss'
import RobotLayer from './RobotLayer'
import robot from '../../assets/freight100.svg'
import { getMapImage } from './getMapImage'
import { MapImage, RobotMap } from '../../definitions';

type MapProps = {
    robots?: RobotMap
    showRobots?: boolean
}

class Map extends Component<MapProps, {}> {
    private parentContainer!: RefObject<HTMLDivElement>
    private renderer!: RefObject<HTMLCanvasElement>
    private viewport!: Viewport
    private world!: Container
    private robotLayer!: RobotLayer
    private application!: Application
    private mapImg!: MapImage

    constructor(props: MapProps) {
        super(props)

        this.parentContainer = React.createRef()
        this.renderer = React.createRef()
    }

    handleResize() {
        this.application.renderer.resize(window.innerWidth, window.innerHeight);
        this.viewport.resize(window.innerWidth, window.innerHeight);
    }

    async componentDidMount() {
        const rendererCanvas = this.renderer.current
        const parentContainerDiv = this.parentContainer.current

        if (!rendererCanvas || !parentContainerDiv) {
            throw new Error('Invalid DOM Composition. Missing map DOM elements')
        }

        // Load necessary resources
        // TODO: Move loading somewhere better
        this.mapImg = await getMapImage(4) as MapImage // TODO: Get map ID from route
        Loader.registerPlugin(new TextureLoader())
        Loader.shared
            .add('robot', robot)
            .add('map', this.mapImg.image) // TODO: Unique key per map, grab map from Redux
            .load(() => this.startApp())

        // Application setup
        this.application = new Application({
            view: rendererCanvas,
            width: parentContainerDiv.clientWidth,
            height: parentContainerDiv.clientHeight,
            antialias: false,
            resolution: window.devicePixelRatio,
            backgroundColor: 0x999999,
        })

        window.addEventListener("resize", () => {
            this.handleResize();
        })

        // Viewport setup
        this.viewport = new Viewport({
            screenWidth: window.innerHeight,
            screenHeight: window.innerHeight,
            worldWidth: this.mapImg.width,
            worldHeight: this.mapImg.height,
            interaction: this.application.renderer.plugins.interaction
        })

        this.viewport
            .drag({ clampWheel: true, direction: "all", underflow: "center" })
            .pinch({ noDrag: true })
            .clamp({ direction: "all" })
            .zoom(this.mapImg.width - window.innerWidth, true)
            .wheel({ smooth: 10 })
            .clampZoom({
                maxHeight: this.mapImg.height * 1.5,
                minHeight: window.innerHeight / 2,
                maxWidth: this.mapImg.width * 1.5,
                minWidth: window.innerWidth / 2
            })

        // World setup
        this.world = new Container()

        // Add viewport and world to stage
        this.application.stage.addChild(this.viewport)
        this.viewport.addChild(this.world)
        this.handleResize()
    }

    startApp() {
        // Map layer setup
        const mapSprite = new Sprite(Loader.shared.resources['map'].texture)
        mapSprite.anchor = CENTER_ANCHOR
        mapSprite.position.set(this.mapImg.width / 2, this.mapImg.height / 2)
        this.world.addChild(mapSprite)


        this.application.start()

        if (this.props.showRobots) {
            if  (!this.props.robots) {
                throw new Error("No robots provided to display")
            }
            // Robot layer setup
            this.robotLayer = new RobotLayer()
            this.robotLayer.position.y = this.mapImg.height
            this.world.addChild(this.robotLayer)

            //this.application.ticker.maxFPS = MAX_FPS
            this.application.ticker.add(() => {
                this.robotLayer.update(this.props.robots!)
            })
        }
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