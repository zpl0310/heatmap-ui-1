import { RobotStatus } from "../../definitions";

export const getFitZoom = (
    screenHeight: number,
    screenWidth: number,
    worldHeight: number,
    worldWidth: number,
) => Math.min(screenHeight / worldHeight, screenWidth / worldWidth)

export const statusFromLocalization = (status: RobotStatus, localized: boolean) => {
    // Offline/error takes precedence over mislocalization?
    if (status !== RobotStatus.Offline &&
        status !== RobotStatus.Error &&
        status !== RobotStatus.Stopped &&
        localized === false) {
        return RobotStatus.Mislocalized
    } else {
        return status
    }
}

export const heatColor = (value: number): number => {
    let alpha = 1
    if (value > 1) {
        value = 1
    } else if (value < 0) {
        value = 0
        alpha = 0
    } else if (value < 0.2) {
        alpha = 5 * value
    }

    return hslToRgb(0.3 * (1 - value), 1, 0.5, alpha)
}

/**
     * Converts an HSL color value to RGBA. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @param   {number}  a       The alpha
     * @return  {number}          The RGBA representation
     */
function hslToRgb(h: number, s: number, l: number, a: number) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3) * 255;
        g = hue2rgb(p, q, h) * 255;
        b = hue2rgb(p, q, h - 1 / 3) * 255;
    }

    a = a * 255

    return (a << 24) | (b << 16) | (g << 8) | r
}