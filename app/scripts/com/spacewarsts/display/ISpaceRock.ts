/**
 * Created by Greco on 2/4/15.
 */

/// <reference path="../utils/math/IPoint.ts" />
module com.spacewarsts.display {
    import  IPoint = utils.math.IPoint;
    export interface ISpaceRock {
        //new (target:{x:number;y:number}) : ISpaceRock;
        //(target:IPoint);
        update():void;
    }
}