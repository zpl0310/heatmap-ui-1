export type Instance = {
    id: string
    name: string
}

export type Map = {
    id: string
    name: string
    image: MapImage | null
}

export type MapImage = {
    width: number,
    height: number,
    image: string
}

export type MLPoint = {
    x: number
    y: number
    //value: number
}

export type ChartPoint = {
    date: Date
    value: number
}

export type Robot = {
    id: string
    pose: Pose
    status: RobotStatus
}

export enum RobotStatus {
    Offline = "OFFLINE",
    Idle = "IDLE",
    Working = "WORKING",
    Mislocalized = "MISLOCALIZED",
    Error = "ERROR"
}

export type Pose = {
    x: number
    y: number
    theta: number
}