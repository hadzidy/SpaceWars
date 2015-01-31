/**
 * Spaceship
 * Created by raul on 1/23/15.
 */
module com.spacewarsts.ui {


    export class Keyboard {

        static UP_KEY   : number = 38;
        static DOWN_KEY   : number = 40;
        static RIGHT_KEY   : number = 39;
        static LEFT_KEY   : number = 37;
        static SHOOT_KEY   : number = 13;

        private static CURRENT_KEY:number = -1;
        
        public static initialize(document:JQuery):void {

            document.keydown((e) => {
                e.preventDefault();
                Keyboard.CURRENT_KEY = e.keyCode;
            });

            document.keyup((e) => {
                e.preventDefault();
                Keyboard.CURRENT_KEY = -1;
            });
        }

        public static isKeyDown(pressKey:number):boolean {
            return Keyboard.CURRENT_KEY == pressKey;
        }
    }
}