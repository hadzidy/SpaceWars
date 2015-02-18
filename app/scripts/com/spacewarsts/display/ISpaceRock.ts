/**
 * Created by Greco on 2/4/15.
 */

/// <reference path="../utils/math/IPoint.ts" />
module com.spacewarsts.display {
    import  IPoint = utils.math.IPoint;
    export interface ISpaceRock {
        x:number;
        y:number;
        radius:number;
        scoreValue:number;
        update():void;
        setPosition(target:IPoint):void;
    }
}