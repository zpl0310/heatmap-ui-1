
import * as PIXI from 'pixi.js'
import { RobotStatus } from '../../definitions'

export const DEV_MAP_ID = '5'
export const DEV_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UWkdSVVZEUmtNeVJUVTRSVGcwUlVNd05qQXpSalE0TlRRMU5URTVNakF4TlRWRVF6ZzFPQSJ9.eyJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vaW5zdGFuY2UiOlsiKiJdLCJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vdXNlcl90eXBlIjoiaHVtYW4iLCJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJodHRwczovL2ZldGNoY29yZS1jbG91ZC5jb20vcm9sZXMiOlsiYWRtaW4iLCJnb2QiXSwiaXNzIjoiaHR0cHM6Ly9oZWxsby10aGVyZS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWM4MDNmZDg1MmJjNDMyYTdiMDk2MmI5IiwiYXVkIjpbImZldGNoY29yZSIsImh0dHBzOi8vaGVsbG8tdGhlcmUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU2MzMyMDk3MiwiZXhwIjoxNTY1OTEyOTcyLCJhenAiOiJlZlBqSXpacnNUcTJYRFpTQkFTOGtiYkVibzJwdFFaaiIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZmV0Y2hjb3JlOmFsbF9hY2Nlc3MiLCJndHkiOiJwYXNzd29yZCJ9.dC0gYaeHD4aRwrlm6NUZL9gctCj8CPG70FEas3cH4K_6_cjFVcrPyyCgpgwcfWvGYlJf8ZEIIMoXtF-p8bS4-eriV4OspFaIfCQSM_S3edymiJrzRmJne5wzM9Hiv9lHMfXTEo096PfiK7U4kZZhBB5VNzKUqoTlU9RHAvWi_YsfBaSHLo6W72GHYmba0vpoS1_yj4vsH3XybC-I5gbBiF27Yu5QbFRLUdKDts6fb59pzQBq6QiTff3JnbV0Labtc07sGa5rXcWjUP0F4yykxaGhvEKJFTdu7h3D-R4RwrgX0IxWsn40UP2EGBkWDyaMejVv3wE_CpbZu8srcw2LHw'
export const DEV_INSTANCE = 'localhost:8888'

export const CENTER_ANCHOR = new PIXI.Point(0.5, 0.5)
export const DEFAULT_SCALE = new PIXI.Point(1, -1)
export const MAP_PIXEL_RATIO = 0.05
export const ROBOT_SIZE = 10

export const MAX_FPS = 24

export const INTERPOLATION_DELAY = 200

export const STATUS_COLORS = {
    [RobotStatus.Working]: 0x66FF00,
    [RobotStatus.Idle]: 0x00AAFF,
    [RobotStatus.Mislocalized]: 0xFFAA00,
    [RobotStatus.Offline]: 0x666666,
    [RobotStatus.Error]: 0xFF0000,
    [RobotStatus.Stopped]: 0xFF0000
}