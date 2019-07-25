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
        localized === false) {
        return RobotStatus.Mislocalized
    } else {
        return status
    }
}