/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/math/toRad.ts" />
/// <reference path="./ISpaceRock.ts" />
/// <reference path="../utils/math/IPoint.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import toRad = utils.math.toRad;
    import IPoint = utils.math.IPoint;

    export class Asteroids extends createjs.Shape implements  ISpaceRock {

        private deltaY:number;
        private deltaX:number;

        private _radius:number;
        private target:IPoint;
        private _scoreValue:number;

        private _speed:number= 800;

        constructor () {

            super();
            this.init();

            this._radius= 15;
            this._scoreValue= 30;
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
                .moveTo(-15, -5)
                .lineTo(0, -15)
                .lineTo(10, -15)
                .lineTo(15, -10)
                .lineTo(15, 5)
                .lineTo(0, 15)
                .lineTo(-10, 10)
                .closePath();
        }


        private getDirection():void{
            var angleRotation= Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;

            this.deltaX = (Math.cos(toRad(angleRotation))* 3);
            this.deltaY = (Math.sin(toRad(angleRotation))* 3);
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