/**
 * Created by Greco on 2/5/15.
 */
module com.spacewarsts.utils.math {
    export function getDistance(a:IPoint, b:IPoint):number {
        /** Converts numeric degrees to radians */
        var distance = Math.sqrt(((a.x-b['x'])*(a.x-b['x'])) + ((a.y-b['y'])*(a.y-b['y'])));
        return distance
    }
}