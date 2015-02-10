/**
 * Created by had on 2/3/15.
 */
/**
 * Created by had on 1/29/15.
 */

/// <reference path="../display/Asteroids.ts" />
/// <reference path="../display/Comet.ts" />
/// <reference path="../display/Planet.ts" />
/// <reference path="../display/Meteorites.ts" />
/// <reference path="../display/ISpaceRock.ts" />
/// <reference path="../display/SpaceRockFactory.ts" />
/// <reference path="../utils/math/IPoint.ts" />

module com.spacewarsts.rockZones {

    import Asteroids= display.Asteroids;
    import Comet= display.Comet;
    import Planet= display.Planet;
    import Meteorites= display.Meteorites;
    import ISpaceRock= display.ISpaceRock;
    import SpaceRockFactory = display.SpaceRockFactory;
    import IPoint = utils.math.IPoint;

    export class SpaceRocks {

        private rockArray:Array<ISpaceRock>;
        private stage;
        private deltaTime;
        private rockCurrentTime;
        private ship;

        static ROCK_MAX_INTERVAL:number = 800;

        constructor(stage, ship) {
            this.rockArray = [];
            this.rockCurrentTime= 0;
            this.ship= ship;
            this.stage= stage;
        }

        get allRocks():Array<ISpaceRock> {
            return this.rockArray;
        }

        public update(delta): void {
            this.deltaTime = delta;
            this.shoot();

            for(var index in this.rockArray){
                var a:ISpaceRock = this.rockArray[index];
                a.update();

            }
        }

        private shoot(){
            if(this.rockCurrentTime<=0){
                this.createRock();
                this.rockCurrentTime = SpaceRocks.ROCK_MAX_INTERVAL;
            }else{
                this.rockCurrentTime -= this.deltaTime;
            }
        }

        private createRock():void {

            var roca:number = Math.floor(Math.random() * 4) + 1;

            var rock_position:IPoint = {x: this.ship.x, y: this.ship.y};

            if (roca == SpaceRockFactory.PLANET_TYPE) {
                rock_position = {x:this.stage.canvas.clientWidth/2, y:this.stage.canvas.clientHeight/2};
            }
            if (roca == SpaceRockFactory.METEORITE_TYPE) {
                rock_position = {x:this.stage.canvas.clientWidth/3, y:this.stage.canvas.clientHeight/3};
            }

            var a:ISpaceRock = SpaceRockFactory.create(roca, rock_position);


            this.rockArray.push(a);
            this.stage.addChild(a);
        }
        coalitionRemoveRock(index:any):void {
            this.stage.removeChild(this.rockArray[index]);
            this.rockArray.splice(index, 1);
        }
    }
}