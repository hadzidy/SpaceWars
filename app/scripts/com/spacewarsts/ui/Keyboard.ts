/**
 * Spaceship
 * Created by raul on 1/23/15.
 */
module com.spacewarsts.ui {


    export class Keyboard {

        static UP_KEY   : number = 38;
        static RIGHT_KEY   : number = 39;
        static LEFT_KEY   : number = 37;
        static SHOOT_KEY   : number = 32;

        private static CURRENT_KEY:number = -1;
        private static KEY_PRESS:Object = {};

        public static initialize(document:JQuery):void {

            Keyboard.KEY_PRESS[Keyboard.UP_KEY] = false;
            Keyboard.KEY_PRESS[Keyboard.RIGHT_KEY] = false;
            Keyboard.KEY_PRESS[Keyboard.LEFT_KEY] = false;
            Keyboard.KEY_PRESS[Keyboard.SHOOT_KEY] = false;

            document.keydown((e) => {
                e.preventDefault();
                Keyboard.KEY_PRESS[e.keyCode] = true;
            });

            document.keyup((e) => {
                e.preventDefault();
                Keyboard.KEY_PRESS[e.keyCode] = false;
            });
        }

        public static isKeyDown(pressKey:number):boolean {
            return Keyboard.KEY_PRESS[pressKey];
        }
    }
}