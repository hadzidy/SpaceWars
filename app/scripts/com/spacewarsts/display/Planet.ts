/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/math/toRad.ts" />
/// <reference path="./ISpaceRock.ts" />
/// <reference path="../utils/math/IPoint.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import toRad = utils.math.toRad;
    import IPoint = utils.math.IPoint;

    export class Planet extends createjs.Shape implements  ISpaceRock {

        private deltaY:number;
        private deltaX:number;
        private _radius:number;

        constructor (private target:IPoint) {

            super();
            this.init();
            this.setInitialPosition();
            this.getDirection();

            this._radius= 20;
        }

        get radius(){
            return this._radius;
        }
        private setInitialPosition():void {
            var angle= this.getRandomAngle();
            this.x= this.target.x+ Math.cos(angle)* 400;
            this.y= this.target.y+ Math.sin(angle)* 400;
        }

        private getRandomAngle():number {
            return toRad(Math.random()*360);
        }


        private init():void {
            this.graphics.beginStroke("white")
                .setStrokeStyle(2)
                .drawCircle(0,0,20)
                .closePath();
        }


        private getDirection():void{
            var angleRotation= Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;

            this.deltaX = (Math.cos(toRad(angleRotation))* 2);
            this.deltaY = (Math.sin(toRad(angleRotation))* 2);
        }

        update():void {
            this.x += this.deltaX;
            this.y += this.deltaY;
        }

    }
}