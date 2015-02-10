/**
 * Created by had on 2/6/15.
 */

/// <reference path="./../display/SpaceShip.ts" />
/// <reference path="./../display/ISpaceRock.ts" />
/// <reference path="./../display/Bullets.ts" />
/// <reference path="./../rockZones/SpaceRocks.ts" />
/// <reference path="../utils/math/getDistance.ts" />
/// <reference path="../SpaceWarsGame.ts" />

module com.spacewarsts.core {

    import Spaceship = display.Spaceship;
    import SpaceRocks = rockZones.SpaceRocks;
    import ISpaceRock= display.ISpaceRock;
    import Bullets= display.Bullets;
    import getDistance = utils.math.getDistance;
    //import SpaceWarsGame = spacewarsts.SpaceWarsGame;

    export class CoalitionManager extends createjs.EventDispatcher {

        private _shipHitArea:createjs.Shape;

        static ROCK_SHIP_COALITION_EVENT = "CoalitionManager.RockShipCoalitionEvent"
        static BULLET_ROCK_COALITION_EVENT = "CoalitionManager.BulletRockCoalitionEvent"

        constructor (private game:SpaceWarsGame) {
            super();
            this._shipHitArea = new createjs.Shape();


            this._shipHitArea.graphics.beginStroke("red")
                .setStrokeStyle(2)
                .drawCircle(0,0,game.ship.radius)
                .closePath();


            //game.stage.addChild(this._shipHitArea);
        }

        update():void {
            this._shipHitArea.x = this.game.ship.x;
            this._shipHitArea.y = this.game.ship.y;
            //this.findeBulletsRocksCoalition();
            this.findRocksShipCoalition();
            this.findBulletRockCoalition();
        }

        private findRocksShipCoalition():void {

            var allRocks = this.game.spaceRockManager.allRocks;
            var ship = this.game.ship;

            for(var index in allRocks){
                var rock:ISpaceRock = allRocks[index];
                var a = {x:ship.x, y:ship.y};
                var b = {x:rock.x, y:rock.y};
                var distance = getDistance(a,b);
                if(distance < (ship.radius + rock.radius)){
                    this.dispatchEvent(new createjs.Event(CoalitionManager.ROCK_SHIP_COALITION_EVENT, false, false));
                }

            }
        }

        private findBulletRockCoalition():void{

            var allBullets= this.game.ship.gun.allBullets;
            var allRocks = this.game.spaceRockManager.allRocks;

            for(var indexB in allBullets){
                var bullet:Bullets= allBullets[indexB];
                var a = {x: bullet.x, y: bullet.y};
                for(var indexR in allRocks){
                    var rock:ISpaceRock= allRocks[indexR];
                    var b = {x: rock.x, y: rock.y};
                    var distance = getDistance(a,b);
                    if(distance < (bullet.radius +rock.radius)){
                        var event = new createjs.Event(CoalitionManager.BULLET_ROCK_COALITION_EVENT, false, false);
                        event.data= [indexB,indexR];
                        this.dispatchEvent(event);
                    }
                }
            }

        }


    }
}