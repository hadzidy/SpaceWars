/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/math/toRad.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import toRad = utils.math.toRad;

    export class Asteroids extends createjs.Shape {

        private deltaY:number;
        private deltaX:number;
        private target:{x:number; y:number};

        constructor (target) {

            super();

            console.log(target);

            this.target= {x:target.x, y:target.y};


            //this.x = this.initX = config.xPos;
            //this.y = this.initY = config.yPos;
            //this.rotation = config.angle;
            //


            this.init();
            this.setInitialPosition();
            this.getDirection();
        }
        private setInitialPosition():void {
            var angle= this.getRandomAngle();
           this.x= this.target.x+ Math.cos(angle)* 500;
           this.y= this.target.y+ Math.sin(angle)* 500;
        }

        private getRandomAngle():number {
            return toRad(Math.random()*360);
        }


        private init():void {
            this.graphics.beginStroke("white")
                .setStrokeStyle(2)
                .lineTo(0,0)
                .lineTo(5,-5)
                .lineTo(15,-5)
                .lineTo(20,5)
                .lineTo(15,15)
                .lineTo(10,20)
                .lineTo(0,15)
                .lineTo(-5,5)
                .closePath();
        }


        private getDirection():void{
            var angleRotation= Math.atan2(this.target.y - this.y, this.target.x - this.x) * 180 / Math.PI;

            this.deltaX = (Math.cos(toRad(angleRotation))* 3);
            this.deltaY = (Math.sin(toRad(angleRotation))* 3);
        }

        update():void {
            this.x += this.deltaX;
            this.y += this.deltaY;
        }

    }
}