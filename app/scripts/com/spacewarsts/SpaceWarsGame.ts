/// <reference path="./display/SpaceShip.ts" />
/// <reference path="./display/Bullets.ts" />
/// <reference path="./display/Asteroids.ts" />
/// <reference path="./rockZones/SpaceRocks.ts" />
/// <reference path="./ui/Keyboard.ts" />
/// <reference path="./core/CoalitionManager.ts" />
/// <reference path="./core/Hud.ts" />
/// <reference path="./events/CoalitionEvent.ts" />
/// <reference path="./display/ISpaceRock.ts" />


module com.spacewarsts {

    import Spaceship= display.Spaceship;
    import Bullet= display.Bullets;
    import SpaceRocks= rockZones.SpaceRocks;
    import Asteroids= display.Asteroids;
    import Keyboard = ui.Keyboard;
    import CoalitionManager = core.CoalitionManager;
    import Hud = core.Hud;
    import CoalitionEvent = events.CoalitionEvent;
    import ISpaceRock = display.ISpaceRock;


    export class SpaceWarsGame {

        private _stage;
        private _ship: Spaceship;
        private _coalitionManager:CoalitionManager;
        private _spaceRockManager:SpaceRocks;
        private _ticker_handler;
        private _hud;




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
            this._hud = new Hud();
            this.stage.addChild(this._hud.scoreInput);
            this.stage.addChild(this._hud.timeInput);

            this._coalitionManager = new CoalitionManager(this);
            console.log(this._ship);

            this._coalitionManager.addEventListener(CoalitionEvent.ROCK_SHIP_COALITION_EVENT, (e:CoalitionEvent)=> {
                var shipIndex= this.stage.children.indexOf(this._ship);
                this.stage.removeChildAt(shipIndex);
                this.stage.removeAllChildren();
                this.showGameOver();
                console.log("GameOVer");

                this.stopTicker();

            });

            this._coalitionManager.addEventListener(CoalitionEvent.BULLET_ROCK_COALITION_EVENT, (e:CoalitionEvent)=> {
                console.log(e.data, "the daaata");
                var bulletToRemove:Bullet = e.bulletRockCoalitionData.bullet;
                var rockToRemove:ISpaceRock = e.bulletRockCoalitionData.rock;
                this._hud.score = (rockToRemove.scoreValue);
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

            //console.log((Math.round(event.time / 100)/ 10).toFixed(1));
            this._hud.timer= (event.time);

            this._coalitionManager.update();
            this._stage.update();
            this._hud.update();
        }

        private showGameOver(){
            $("h1").css("display", "block");
        }
    }
}