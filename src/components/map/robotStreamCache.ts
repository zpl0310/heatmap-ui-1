/**
 * @copyright 2018 Fetch Robotics, Inc.
 * @author Michael Hwang
 */

import DequeChangeBuffer from './changeBuffer'
import { PoseAtTime, Pose } from '../../definitions';

const twoPI = Math.PI * 2 // slightly faster to precalc this beforehand

export function getPoseFromTimestampPair(now: number, before?: PoseAtTime, after?: PoseAtTime): Pose {
    // edge cases that don't need processing
    if (!before && !after) {
        return { x: 0, y: 0, theta: 0 }
    }
    if (!after) {
        return before!.pose
    }
    if (!before) {
        return after!.pose
    }

    const numerator = now - before.time
    const denominator = after.time - before.time
    const factor = numerator / denominator

    const x = (after.pose.x - before.pose.x) * factor + before.pose.x
    const y = (after.pose.y - before.pose.y) * factor + before.pose.y

    // need to change rotation to an equivalent within 180 degrees
    let dTheta = after.pose.theta - before.pose.theta
    if (Math.abs(dTheta) > Math.PI) {
        // this makes sure angle interpolation is smooth, but assumes engine handles wraparound
        dTheta =
            after.pose.theta > 0
                ? after.pose.theta - twoPI - before.pose.theta
                : after.pose.theta + twoPI - before.pose.theta
    }
    const theta = dTheta * factor + before.pose.theta

    return { x, y, theta }
}

/**
 * This class should be used as a singleton, and provnamee two things:
 * 1 - A central store for robot positions.
 * 2 - Interpolating a robot's position using a provnameed timestamp to provnamee data at an arbitrary rate, despite actual
 *      data being rate-limited (e.g. 60 Hz updates when updates provnameed at 10 Hz
 */
type RobotStore = { [key: string]: DequeChangeBuffer }
export class RobotPositionsCache {
    public store: RobotStore

    constructor() {
        this.store = {}
    }

    // NOTE: In JS, default args are evaluated at call time
    updatePositionForRobot = (
        name: string,
        pose: Pose,
        time: number = performance.now(),
    ) => {
        if (!this.store[name]) {
            // NOTE: Minimum size of this buffer should be interpolation delay * robot state update rate.
            // For 200ms interpolation delay, this is 2 (0.2 * 10). 3 or higher should be safe.
            this.store[name] = new DequeChangeBuffer(5)
        }

        // double-precision (64-bit) required if using DOMHighResTimeStamp; otherwise single-precision will suffice
        // NOTE: technically incorrect to use UI's timestamp. Convert message timestamp in future if problematic
        const value: PoseAtTime = { pose, time }
        this.store[name].push(value)
    }

    getPositionForRobot = (name: string, time: number): Pose => {
        const robotBuffer = this.store[name]
        if (!robotBuffer) {
            return { x: 0, y: 0, theta: 0 }
        }

        const pair = robotBuffer.getPairForTimestamp(time)
        return getPoseFromTimestampPair(time, pair[0], pair[1])
    }

    /**
     * Get the latest known position for a given robot, disregarding interpolation factors
     * @param {string} name The name of the robot
     * @returns {Pose} An object whose elements are x [m], y [m], and theta [rad]
     */
    getLatestPositionForRobot = (name: string): Pose => {
        const robotBuffer = this.store[name]
        if (!robotBuffer) {
            return { x: 0, y: 0, theta: 0 }
        }

        const entry = robotBuffer.getLatest()
        return entry ? entry.pose : { x: 0, y: 0, theta: 0 }
    }

    clearStore = () => {
        this.store = {}
    }
}

// TODO: Adapt this to our Redux setup
// /**
//  * Class used to aggregate robot stream updates and throttle their dispatch to the redux store
//  */
// export class RobotStreamCache {
//     constructor(positionCache) {
//         this.store = {}
//         this.positionCache = positionCache
//         this.throttledDispatchToRedux = throttle(
//             this.dispatchToReduxStore,
//             1000,
//         )
//     }

//     initializeDispatch(dispatch) {
//         if (this.dispatch) {
//             return
//         }

//         this.dispatch = dispatch
//     }

//     updateStore = (key, value) => {
//         // sometimes robots data is received instead, so ignore those updates
//         if (!value.robot) {
//             return
//         }

//         // don't bother attempting to add if we weren't provided with a position cache
//         if (!this.positionCache) {
//             return
//         }

//         this.store[key] = value
//         this.positionCache.updatePositionForRobot(
//             value.robot,
//             value.current_pose,
//         )
//         this.throttledDispatchToRedux()
//     }

//     clearStore = () => {
//         this.store = {}
//     }

//     dispatchToReduxStore = () => {
//         if (!this.dispatch) {
//             return
//         }

//         // convert store object into array for dispatch to robots entities
//         const results = Object.values(this.store)
//         const data = normalize({ [ENTITY_KEY]: results }, robotsStatesSchema)

//         this.dispatch(robotStatesFetchSuccess(results.length, data, 1))
//         this.clearStore()
//     }
// }
// singleton RobotPositionsCache
export const RobotStatePositionCache = new RobotPositionsCache()
// singleton RobotStreamCache
// export const RobotStateStreamCache = new RobotStreamCache(
//     RobotStatePositionCache,
// )

export const addResultsToCache = (results = []) => {
    const timestamp = performance.now()
    results.forEach(({ robot, current_pose }) => {
        RobotStatePositionCache.updatePositionForRobot(
            robot,
            current_pose,
            timestamp,
        )
    })
}
