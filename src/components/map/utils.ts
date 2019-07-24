export const getFitZoom = (
    screenHeight: number,
    screenWidth: number,
    worldHeight: number,
    worldWidth: number,
) => Math.min(screenHeight / worldHeight, screenWidth / worldWidth)