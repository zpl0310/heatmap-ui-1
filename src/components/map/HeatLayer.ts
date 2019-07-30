import { Container, Rectangle, Texture, Sprite, BaseTexture } from 'pixi.js'
import { DEFAULT_SCALE, MAP_PIXEL_RATIO, CENTER_ANCHOR } from './constants';
import { HeatGrid, MapImage } from '../../definitions';
import { heatColor } from './utils';


export default class HeatLayer extends Container {
    constructor() {
        super()
        this.name = 'HeatLayer'
        this.alpha = 0.3
        this.scale = DEFAULT_SCALE
    }

    public update(heat: HeatGrid, image: MapImage) {
        this.removeChildren()
        if (heat) {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')!
            let scale = heat.gridSize / MAP_PIXEL_RATIO
            canvas.width = Math.ceil(image.width / scale)
            canvas.height = Math.ceil(image.height / scale)

            // Set color value for each pixel
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            var buf = new ArrayBuffer(imageData.data.length);
            var buf8 = new Uint8ClampedArray(buf);
            var data = new Uint32Array(buf);
            heat.values.forEach((point) => {
                data[point.y * canvas.width + point.x] = heatColor(point.value)
            })
            imageData.data.set(buf8);
            ctx.putImageData(imageData, 0, 0);

            // Create texture and crop to map size
            let baseTexture = BaseTexture.from(canvas.toDataURL())
            baseTexture.setResolution(1 / scale)
            let texture = new Texture(baseTexture, new Rectangle(0, 0, image.width, image.height))
            let sprite = new Sprite(texture)
            this.addChild(sprite)
        }
    }
}