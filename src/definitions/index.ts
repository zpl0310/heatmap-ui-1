export type Instance = {
    name: string
}

//temporarily used to get data from instance/map list server
export type Map = {
    id: number
}

export type MapInfo = {
    id: string
    name: string
    x: number
    y: number
    image: MapImage
}

export type MapImage = {
    width: number,
    height: number,
    src: string
}

export type MLPoint = {
    x: number
    y: number
    value: number
}

export type ChartPoint = {
    date: Date
    value: number
}

export type Robot = {
    name: string
    pose: Pose
    status: RobotStatus
}

export enum RobotStatus {
    Offline = "OFFLINE",
    Idle = "IDLE",
    Working = "WORKING",
    Mislocalized = "MISLOCALIZED",
    Error = "ERROR",
    Stopped = "RUNSTOP"
}

export type Pose = {
    x: number
    y: number
    theta: number
}

export type PoseAtTime = {
    pose: Pose
    time: number
}

export type RobotMap = {
    [name: string]: Robot
}