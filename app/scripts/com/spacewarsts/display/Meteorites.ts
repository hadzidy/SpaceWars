/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/math/toRad.ts" />
/// <reference path="./ISpaceRock.ts" />
/// <reference path="../utils/math/IPoint.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import toRad = utils.math.toRad;
    import IPoint = utils.math.IPoint;

    export class Meteorites extends createjs.Shape implements  ISpaceRock {

        private deltaY:number;
        private deltaX:number;
        private _radius:number;
        private _scoreValue:number;
        private target;

        private _speed:number= 500;


        constructor () {

            super();
            this.init();

            this._radius= 10;
            this._scoreValue= 100;
        }

        get radius(){
            return this._radius;
        }
        get scoreValue(){
            return this._scoreValue;
        }

        private getRandomAngle():number {
            return toRad(Math.random()*360);
        }


        private init():void {
            this.graphics.beginStroke("white")
                .setStrokeStyle(2)
                .moveTo(-2,0)
                .lineTo(-2,-4)
                .lineTo(0,-6)
                .lineTo(2,-4)
                .lineTo(4,-2)
                .lineTo(4,0)
                .lineTo(0,2)
                .closePath();
        }


        private getDirection():void{
            var angleRotation= Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;

            this.deltaX = (Math.cos(toRad(angleRotation))* 6);
            this.deltaY = (Math.sin(toRad(angleRotation))* 6);
        }
        setPosition(target:IPoint){
            this.target= target;
            var angle= this.getRandomAngle();
            this.x= this.target.x+ Math.cos(angle)* this._speed;
            this.y= this.target.y+ Math.sin(angle)* this._speed;
            this.getDirection();
        }

        update():void {
            this.x += this.deltaX;
            this.y += this.deltaY;
        }

    }
}