import * as React from 'react'
import { Component, RefObject } from 'react'
import { Application, Container, Loader, Sprite, TextureLoader, Texture } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import h337, { Heatmap } from 'heatmap.js'

import { CENTER_ANCHOR, MAX_FPS, DEV_MAP_ID, MAP_PIXEL_RATIO } from './constants'
import '../../assets/styles/heatmap.scss'
import RobotLayer from './RobotLayer'
import robot from '../../assets/freight100.svg'
import { MapInfo, RobotMap } from '../../definitions';
import { getMapInfo } from './getMapInfo';
import { getFitZoom } from './utils';

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
    private map!: MapInfo
    private heatmap!: Heatmap<string, string, string>
    private heatmapSprite!: Sprite

    constructor(props: MapProps) {
        super(props)

        this.parentContainer = React.createRef()
        this.renderer = React.createRef()
    }

    handleResize() {
        this.application.renderer.resize(window.innerWidth, window.innerHeight);
        this.viewport.resize(window.innerWidth, window.innerHeight);
        this.initializeHeatmap()
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
            this.handleResize()
        })

        const dims = {
            screenWidth: window.innerHeight,
            screenHeight: window.innerHeight,
            worldWidth: this.map.image.width,
            worldHeight: this.map.image.height,
        }

        // Viewport setup
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

        this.application.start()

        this.initializeHeatmap()

        if (this.props.showRobots) {
            if (!this.props.robots) {
                throw new Error("No robots provided to display")
            }
            // Robot layer setup
            this.robotLayer = new RobotLayer()
            this.robotLayer.position.x = -this.map.x / MAP_PIXEL_RATIO
            this.robotLayer.position.y = this.map.image.height + this.map.y / MAP_PIXEL_RATIO
            this.world.addChild(this.robotLayer)

            //this.application.ticker.maxFPS = MAX_FPS
            this.application.ticker.add(() => {
                this.robotLayer.update(this.props.robots!)
            })
        }
    }

    initializeHeatmap() {
        let fakeData = []
        for (let i = 0; i < 1000; i++) {
            let x = Math.floor(Math.random() * this.map.image.width)
            let y = Math.floor(Math.random() * this.map.image.height)
            fakeData.push({x, y, value: Math.pow(1 - Math.abs(0.5 * x - y) / this.map.image.width, 3)})
        }

        // Heatmap setup
        this.heatmap = h337.create({
            container: document.querySelector('#fetch-map-container')! as HTMLElement,
            maxOpacity: 0.2,
        }).setData({
            data: fakeData,
            min: 0,

            // Get maximum value in data
            max: fakeData.map(point => point.value).reduce((prev, cur) => Math.max(prev, cur))
        })

        this.drawHeatmap()
    }

    drawHeatmap() {
        let hmTex = Texture.from(this.heatmap.repaint().getDataURL())
        let hmSprite = new Sprite(hmTex)
        if (this.heatmapSprite) {
            this.world.removeChild(this.heatmapSprite)
        }
        this.heatmapSprite = hmSprite
        this.world.addChild(this.heatmapSprite)
    }

    render() {
        return (
            <div
                id="fetch-map-container"
                data-cy="fetch-map-container"
                ref={this.parentContainer}
            >
                <div id="heatmap-container"></div>
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