/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/math/toRad.ts" />
/// <reference path="./ISpaceRock.ts" />
/// <reference path="../utils/math/IPoint.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import toRad = utils.math.toRad;
    import IPoint = utils.math.IPoint;

    export class Comet extends createjs.Shape implements  ISpaceRock {

        private deltaY:number;
        private deltaX:number;
        private _radius:number;
        private _scoreValue:number;

        constructor (private target:IPoint) {

            super();
            this.init();
            this.setInitialPosition();
            this.getDirection();
            this._radius= 20;
            this._scoreValue= 60;
        }

        get radius(){
            return this._radius;
        }
        get scoreValue(){
            return this._scoreValue;
        }

        private setInitialPosition():void {
            var angle= this.getRandomAngle();
            this.x= this.target.x+ Math.cos(angle)* 600;
            this.y= this.target.y+ Math.sin(angle)* 600;
        }

        private getRandomAngle():number {
            return toRad(Math.random()*360);
        }


        private init():void {
            this.graphics.beginStroke("white")
                .setStrokeStyle(2)
                .moveTo(-30, 0)
                .lineTo(-24, -12)
                .lineTo(-18, -18)
                .lineTo(0, -18)
                .lineTo(12, -12)
                .lineTo(18, 6)
                .lineTo(6, 18)
                .lineTo(-12, 18)
                .lineTo(-24, 12)
                .lineTo(-30, 6)
                .closePath();
        }


        private getDirection():void{
            var angleRotation= Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;

            this.deltaX = (Math.cos(toRad(angleRotation))* 4);
            this.deltaY = (Math.sin(toRad(angleRotation))* 4);
        }

        update():void {
            this.x += this.deltaX;
            this.y += this.deltaY;
        }

    }
}