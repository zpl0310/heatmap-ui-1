import * as React from 'react'
import { Component, RefObject } from 'react'
import { Application, Container, Loader, Sprite, TextureLoader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { CENTER_ANCHOR, MAX_FPS, DEV_MAP_ID, MAP_PIXEL_RATIO } from './constants'
import '../../assets/styles/heatmap.scss'
import RobotLayer from './RobotLayer'
import robot from '../../assets/freight100.svg'
import { MapInfo, RobotMap, HeatGrid } from '../../definitions';
import { getMapInfo } from './getMapInfo';
import { getFitZoom } from './utils';
import HeatLayer from './HeatLayer';

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
    private heatLayer!: HeatLayer
    private application!: Application
    private map!: MapInfo

    constructor(props: MapProps) {
        super(props)

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
        this.parentContainer = React.createRef()
        this.renderer = React.createRef()
    }

    handleResize() {
        const parent = this.parentContainer.current!
        this.application.renderer.resize(parent.clientWidth, parent.clientHeight);
        this.viewport.resize(parent.clientWidth, parent.clientHeight);
    }

    async componentDidMount() {
        const rendererCanvas = this.renderer.current
        const parentContainerDiv = this.parentContainer.current

        if (!rendererCanvas || !parentContainerDiv) {
            throw new Error('Invalid DOM Composition. Missing map DOM elements')
        }

        // Load necessary resources
        // TODO: Move loading somewhere better
        this.map = await getMapInfo(DEV_MAP_ID) as MapInfo // TODO: Get map ID from route
        Loader.registerPlugin(new TextureLoader())
        Loader.shared
            .add('robot', robot)
            .add('map', this.map.image.src) // TODO: Unique key per map, grab map from Redux
            .load(() => this.startApp())

        window.addEventListener("resize", () => {
            this.handleResize();
        })

        // Application setup
        this.application = new Application({
            view: rendererCanvas,
            width: parentContainerDiv.clientWidth,
            height: parentContainerDiv.clientHeight,
            antialias: false,
            resolution: window.devicePixelRatio,
            backgroundColor: 0x999999,
        })

        // Viewport setup
        const dims = {
            screenWidth: window.innerHeight,
            screenHeight: window.innerHeight,
            worldWidth: this.map.image.width,
            worldHeight: this.map.image.height,
        }

        this.viewport = new Viewport({
            ...dims,
            interaction: this.application.renderer.plugins.interaction,
        })

        const maxZoom = Math.max(this.map.image.height, this.map.image.width) * 2
        const minZoom = Math.min(this.map.image.height, this.map.image.width) / 3
        this.viewport
            .drag({ clampWheel: true, direction: "all", underflow: "center" })
            .pinch({ noDrag: true })
            .clamp({ direction: "all" })
            .zoom(getFitZoom(dims.screenHeight, dims.screenWidth, dims.worldHeight, dims.worldWidth), true)
            .wheel({ smooth: 10, percent: -0.5 })
            .clampZoom({
                maxHeight: maxZoom,
                minHeight: minZoom,
                maxWidth: maxZoom,
                minWidth: minZoom
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
        mapSprite.position.set(this.map.image.width / 2, this.map.image.height / 2)
        this.world.addChild(mapSprite)

        // Heat layer setup
        this.heatLayer = new HeatLayer()
        this.heatLayer.position.set(0, this.map.image.height)
        let gridSize = 0.05
        // TODO: Use real data
        let gridValues = []
        for (let x = 0; x < this.map.image.width * MAP_PIXEL_RATIO / gridSize; x++) {
            for (let y = 0; y < this.map.image.height * MAP_PIXEL_RATIO / gridSize; y++) {
                //let value = Math.sin((x | 10) ^ (y | 10))
                let value = 1 - Math.sqrt(Math.pow(x - this.map.image.height / 2, 2) + Math.pow(y - this.map.image.height / 2, 2)) * 2 / this.map.image.height
                if (value > 0) {
                    gridValues.push({ x, y, value })
                }
            }
        }
        let grid: HeatGrid = { gridSize, values: gridValues }
        this.heatLayer.update(grid, this.map.image)
        this.world.addChild(this.heatLayer)

        // Robot layer setup
        if (this.props.showRobots) {
            if (!this.props.robots) {
                throw new Error("No robots provided to display")
            }

            this.robotLayer = new RobotLayer()
            this.robotLayer.position.x = -this.map.x / MAP_PIXEL_RATIO
            this.robotLayer.position.y = this.map.image.height + this.map.y / MAP_PIXEL_RATIO
            this.world.addChild(this.robotLayer)

            //this.application.ticker.maxFPS = MAX_FPS
            this.application.ticker.add(() => {
                this.robotLayer.update(this.props.robots!)
            })
        }

        this.application.start()
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