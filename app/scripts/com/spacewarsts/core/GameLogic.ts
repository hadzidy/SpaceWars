/**
 * Created by had on 2/6/15.
 */

module com.spacewarsts.core {

    export class GameLogic extends createjs.EventDispatcher {

        private _score:number;
        private _timeCounter:number;

        constructor (private game:SpaceWarsGame) {
            super();
            this._score= 0;
            this._timeCounter= 0;
        }

        update():void {

        }

    }
}