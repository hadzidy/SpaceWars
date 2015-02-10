/// <reference path="./display/SpaceShip.ts" />
/// <reference path="./display/Bullets.ts" />
/// <reference path="./display/Asteroids.ts" />
/// <reference path="./rockZones/SpaceRocks.ts" />
/// <reference path="./ui/Keyboard.ts" />
/// <reference path="./core/CoalitionManager.ts" />


module com.spacewarsts {

    import Spaceship= display.Spaceship;
    import Bullet= display.Bullets;
    import SpaceRocks= rockZones.SpaceRocks;
    import Asteroids= display.Asteroids;
    import Keyboard = ui.Keyboard;
    import CoalitionManager = core.CoalitionManager;


    export class SpaceWarsGame {

        private _stage;
        private _ship: Spaceship;
        private _coalitionManager:CoalitionManager;
        private _spaceRockManager:SpaceRocks;
        private _ticker_handler;


        constructor(){
            console.log("New Space Wars Game Created");
            Keyboard.initialize($(document));
        }

        get stage():createjs.Stage {
            return this._stage;
        }

        get ship():Spaceship {
            return this._ship;
        }

        get spaceRockManager():SpaceRocks {
            return this._spaceRockManager;
        }

        public start(): void {
            console.log("Space Wars Game Started");
            this._stage = new createjs.Stage("GameCanvas");

            
            this._ship = new Spaceship();
            this._stage.addChild(this._ship);
            this._spaceRockManager =  new SpaceRocks(this._stage, this._ship);

            this._coalitionManager = new CoalitionManager(this);
            console.log(this._ship);

            this._coalitionManager.addEventListener(CoalitionManager.ROCK_SHIP_COALITION_EVENT, (e:createjs.Event)=> {
                var shipIndex= this.stage.children.indexOf(this._ship);
                this.stage.removeChildAt(shipIndex);
                this.stage.removeAllChildren();
                this.showGameOver();
                console.log("GameOVer");

                this.stopTicker();

            });

            this._coalitionManager.addEventListener(CoalitionManager.BULLET_ROCK_COALITION_EVENT, (e:createjs.Event)=> {
                console.log(e.data);
                var bulletToRemove= e.data[0];
                var rockToRemove= e.data[1];
                this._ship.gun.coalitionRemoveBullet(bulletToRemove);
                this.spaceRockManager.coalitionRemoveRock(rockToRemove);
            });


            this._ticker_handler = this.tick.bind(this);

            createjs.Ticker.setFPS(60);

            this._stage.update();

            this.startTicker();

        }

        startTicker ():void {
            createjs.Ticker.addEventListener("tick", this._ticker_handler);
        }

        stopTicker ():void {
            createjs.Ticker.removeEventListener("tick", this._ticker_handler);
        }

        private tick (event):void {
            var deltaTime = event.delta;
            this._ship.update(deltaTime);
            this._spaceRockManager.update(deltaTime);

            this._coalitionManager.update();
            this._stage.update();
        }

        private showGameOver(){
            $("h1").css("display", "block");
        }
    }
}