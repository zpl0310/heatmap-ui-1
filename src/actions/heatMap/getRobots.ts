import { RobotStatus, RobotMap } from '../../definitions';
import { RobotStatePositionCache } from '../../components/map/robotStreamCache';
import axios from 'axios'
import { DEV_MAP_ID, DEV_TOKEN, DEV_INSTANCE } from '../../components/map/constants';
import { statusFromLocalization } from '../../components/map/utils';

export async function getRobotStates(id: string, page: number = 1, results: RobotMap = {}): Promise<RobotMap> {
    try {
        let res = await axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/robots/?page=${page}`, {
            headers: { 'Authorization': DEV_TOKEN },
        })

        res.data.results.forEach((robot: any) => {
            if (!results[robot.name]) {
                results[robot.name] = {
                    name: robot.name,
                    status: statusFromLocalization(robot.status, robot.localized),
                    pose: { x: 0, y: 0, theta: 0 }
                }
            }
        })

        let statesRes = await axios.get(`http://${DEV_INSTANCE}/api/v1/maps/${id}/robots/states/?page=${page}`, {
            headers: { 'Authorization': DEV_TOKEN },
        })
        statesRes.data.results.forEach((robot: any) => {
            if (results[robot.robot]) {
                results[robot.robot].pose = robot.current_pose
                RobotStatePositionCache.updatePositionForRobot(
                    robot.robot,
                    robot.current_pose,
                    performance.now(),
                )
            }
        })

        if (res.data.next) {
            return getRobotStates(id, page + 1, results)
        }

        return results
    } catch(err) {
        throw(err)
    }
}