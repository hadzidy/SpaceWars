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

        constructor () {
            super();
            this.init();
        }

        private init():void {

            this._shipSpeedX = 0;
            this._shipSpeedY = 0;

            this._gun = new Gun(this);

            this.graphics.setStrokeStyle(2)
                .setStrokeStyle(2)
                .beginStroke("#FFFFFF")
                .moveTo(13, 0)
                .lineTo(-13, 10)
                .moveTo(13, 0)
                .lineTo(-13, -10)
                .moveTo(-7, 8)
                .lineTo(-7, -8)
                .endStroke();

            this.x = 120;
            this.y = 120;

            this._mousePosition= {x:0, y:0};
            this.updateMousePosition();
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
    }
}