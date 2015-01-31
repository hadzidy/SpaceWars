/// <reference path="./display/SpaceShip.ts" />
/// <reference path="./display/Bullets.ts" />
/// <reference path="./display/Asteroids.ts" />
/// <reference path="./ui/Keyboard.ts" />


module com.spacewarsts {

    import Spaceship= display.Spaceship;
    import Bullet= display.Bullets;
    import Asteroids= display.Asteroids;
    import Keyboard = ui.Keyboard;


    export class SpaceWarsGame {

        public stage;

        public ship: Spaceship;

        constructor(){
            console.log("New Space Wars Game Created");
            Keyboard.initialize($(document));
        }
        public start(): void {

            console.log("Space Wars Game Started");
            this.stage = new createjs.Stage("GameCanvas");

            var heightStage = this.stage.canvas.clientHeight;
            var widthStage = this.stage.canvas.clientWidth;

            var stageSize = {w: widthStage, h: heightStage};
            
            this.ship = new Spaceship();
            this.stage.addChild(this.ship);

            var asteroids = new Asteroids(stageSize);

            this.stage.addChild(asteroids);

             var tick= (event)=> {
                 var deltaTime = event.delta;
                 this.ship.update(deltaTime);
                 asteroids.update();


                 this.stage.update();
            }
            createjs.Ticker.setFPS(60)
            createjs.Ticker.addEventListener("tick", tick);

            this.stage.update();

        }
    }
}