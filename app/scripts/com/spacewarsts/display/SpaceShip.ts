/**
 * Spaceship
 * Created by raul on 1/23/15.
 */

/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../ammo/Gun.ts" />
/// <reference path="../utils/math/toRad.ts" />

module com.spacewarsts.display {

    import Keyboard = ui.Keyboard;
    import Gun = ammo.Gun;
    import toRad = utils.math.toRad;

    export class Spaceship extends createjs.Shape {

        private _shipSpeedX:number;
        private _shipSpeedY:number;
        private _mousePosition;
        private _gun:Gun;
        private _fire;

        constructor () {
            super();
            this.init();
        }

        private init():void {

            this._shipSpeedX = 0;
            this._shipSpeedY = 0;

            this._gun = new Gun(this);

            this.drawShip();

            this.x = 120;
            this.y = 120;

            this._mousePosition= {x:0, y:0};
            this.updateMousePosition();
        }

        private drawShip(){
            this.graphics.setStrokeStyle(2)
                .beginStroke("#FFFFFF")
                .moveTo(-14, 0)
                .lineTo(-3, -5)
                .lineTo(2, -6)
                .lineTo(7, -6)
                .lineTo(12, -3)
                .lineTo(14, 0)
                .lineTo(12, 3)
                .lineTo(7, 6)
                .lineTo(2, 6)
                .lineTo(-3, 5)
                .lineTo(-14, 0)
                .moveTo(-7, -3)
                .lineTo(-14, -6)
                .lineTo(-14, -8)
                .lineTo(-7, -8)
                .lineTo(-3, -5)
                .moveTo(-7, 3)
                .lineTo(-14, 6)
                .lineTo(-14, 8)
                .lineTo(-7, 8)
                .lineTo(-3, 5)
                .endStroke()
                .setStrokeStyle(1).beginStroke("#FFFFFF")
                .drawCircle(4, 0, 2);
            this.drawFire();
        }

        private drawFire(){
            this._fire = [this.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").moveTo(-24, -4).lineTo(-18, -4),
                this.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").moveTo(-22, 0).lineTo(-16, 0),
                this.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").moveTo(-24, 4).lineTo(-18, 4)];
        }

        private updateMousePosition(){
            var self= this;
            $(document).mousemove(function(event) {
                self._mousePosition.x = event.pageX;
                self._mousePosition.y = event.pageY;
            });
        }

        //private updateRotation():void {
        //    var angleRotation= Math.atan2(this._mousePosition.y - this.y, this._mousePosition.x - this.x) * 180 / Math.PI;
        //    this.rotation= angleRotation;
        //}

        private updatePosition():void {

            this._shipSpeedX = 0;
            this._shipSpeedY = 0;

            if(Keyboard.isKeyDown(Keyboard.UP_KEY)) {
                this._shipSpeedY = 10;
            }

            //if(Keyboard.isKeyDown(Keyboard.DOWN_KEY)) {
            //    this._shipSpeedY = 10;
            //}
            //
            if(Keyboard.isKeyDown(Keyboard.LEFT_KEY)) {
                this.rotation += -10;
            }

            if(Keyboard.isKeyDown(Keyboard.RIGHT_KEY)) {
                this.rotation += 10;
            }

            this.x += Math.cos(toRad(this.rotation)) * this._shipSpeedY;
            this.y += Math.sin(toRad(this.rotation)) * this._shipSpeedY;
        }

        update(delta:number):void {
            this._gun.update(delta);
            //this.updateRotation();
            this.updatePosition();
        }

        coalition(){
            console.log("crrrrrraaahhhhh")
        }
    }
}