/**
 * @copyright 2018 Fetch Robotics, Inc.
 * @author Michael Hwang
 */

// Third-party imports
import Deque from 'double-ended-queue'
import { PoseAtTime } from '../../definitions';

/**
 * Wrapper utilizing the double-ended-queue package's circular buffer implementation, with helper methods on top
 * double-ended-queue package claims O(1) for all queue operations.
 *
 * In order to keep all operations O(1), this assumes that all items are pushed onto the queue in chronological order.
 *
 * If cost of GC + instantiation of typed arrays in JS is high, it may be better to do non-deque implementation with
 * pointer logic.
 *
 * @param {Integer} bufferLength The number of buffer steps to include. The internal deque is given one more than
 *      this length to avoid resizing at runtime.
 */
export default class DequeChangeBuffer {
    private maxLength: number
    private deque: Deque<PoseAtTime>
    constructor(bufferLength: number) {
        this.maxLength = bufferLength
        this.deque = new Deque(bufferLength + 1)
    }

    /**
     * Push an item onto the queue.
     * @param {Array} item The item's first element should be something comparable with > and <, generally a timestamp.
     *      The type should be consistent with the one used in getPairForTimestamp()
     */
    push(item: PoseAtTime) {
        const queueLength = this.deque.push(item)
        // console.log('queueLength is', queueLength, 'maxLength is', this.maxLength)
        if (queueLength > this.maxLength) {
            // remove items at front of queue when over max length for clean-up
            this.deque.shift()
        }
    }

    getPairForTimestamp(timestamp: number) {
        // iterate backwards over the deque to find an appropriate pair; -1 is the index of the last elem in deque
        let val, before, after
        for (let i = -1; i >= -this.maxLength; i--) {
            val = this.deque.get(i)
            if (!val) {
                // unfilled queue segments are undefined
                // reached end of deque before max length
                break
            }

            // TODO: Separate case for when the timestamp is equal?
            if (timestamp >= val.time) {
                // retrieved value is from before target timestamp
                before = val

                // return immediately, because any further iteration is unnecessary
                break
            }

            if (timestamp < val.time) {
                // retrieved value is from after target timestamp
                after = val
            }
        }

        return [before, after]
    }

    getLatest() {
        return this.deque.peekBack()
    }
}
