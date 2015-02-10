/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/math/toRad.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import toRad = utils.math.toRad;

    export class Bullets extends createjs.Shape {

        private deltaY:number;
        private deltaX:number;
        private initX:number;
        private initY:number;
        private _radius:number;

        constructor (config:{xPos:number;yPos:number;angle:number}) {

            super();

            this.x = this.initX = config.xPos;
            this.y = this.initY = config.yPos;
            this.rotation = config.angle;

            this.deltaX = (Math.cos(toRad(this.rotation))) * 10;
            this.deltaY = (Math.sin(toRad(this.rotation))) * 10;
            this._radius= 3;

            this.init();
        }

        get radius(){
            return this._radius;
        }

        init():void {
            this.graphics.beginFill("#FFFFFF").drawCircle(0, 0, 2)
                .drawCircle(4, 0, 3).drawCircle(10, 0, 4);
        }

        update():void {

            this.x += this.deltaX;
            this.y += this.deltaY;
        }

    }
}