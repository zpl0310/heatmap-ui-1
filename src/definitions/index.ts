export type Instance = {
    id: string
    name: string
}

export type Map = {
    id: string
    name: string
    //width: number
    //height: number
    //image: string
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
    x: number
    y: number
    theta: number
    status: RobotStatus
}

export enum RobotStatus {
    OFFLINE,
    IDLE,
    WORKING,
    MISLOCALIZED,
    ERROR
}