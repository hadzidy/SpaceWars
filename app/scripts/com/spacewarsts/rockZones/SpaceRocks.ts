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
/// <reference path="../utils/RockPool.ts" />

module com.spacewarsts.rockZones {

    import Asteroids= display.Asteroids;
    import Comet= display.Comet;
    import Planet= display.Planet;
    import Meteorites= display.Meteorites;
    import ISpaceRock= display.ISpaceRock;
    import SpaceRockFactory = display.SpaceRockFactory;
    import IPoint = utils.math.IPoint;
    import RockPool = utils.RockPool;

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


                if(a.x < -100 || a.x > 900 || a.y < -100 || a.y > 700) {
                    this.rockArray.splice(index,1);
                    RockPool.getInstance().free(a);
                }

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

            var rock_position:IPoint = {x: this.ship.x, y: this.ship.y};

            var a:ISpaceRock = RockPool.getInstance().alloc();

            if (a instanceof Planet) {
                rock_position = {x:this.stage.canvas.clientWidth/2, y:this.stage.canvas.clientHeight/2};
            } else
            if (a instanceof Meteorites) {
                rock_position = {x:this.stage.canvas.clientWidth/3, y:this.stage.canvas.clientHeight/3};
            }

            a.setPosition(rock_position);


            this.rockArray.push(a);
            this.stage.addChild(a);
        }

        public addRock(value:ISpaceRock) {
            this.rockArray.push(value);
        }

        coalitionRemoveRock(rock:any):void {
            this.stage.removeChild(rock);
            var deleteR= this.rockArray.indexOf(rock);
            this.rockArray.splice(deleteR, 1);

            RockPool.getInstance().free(rock);
        }
    }
}