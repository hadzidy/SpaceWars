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
/// <reference path="../utils/math/getDistance.ts" />

module com.spacewarsts.rockZones {

    import Asteroids= display.Asteroids;
    import Comet= display.Comet;
    import Planet= display.Planet;
    import Meteorites= display.Meteorites;
    import ISpaceRock= display.ISpaceRock;
    import SpaceRockFactory = display.SpaceRockFactory;
    import IPoint = utils.math.IPoint;
    import getDistance = utils.math.getDistance;



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

            //this.rockTarget= {x:stage.canvas.clientWidth/2, y:stage.canvas.clientHeight/2};
            this.ship= ship;
            this.stage= stage;
        }

        public update(delta): void {
            this.deltaTime = delta;
            this.shoot();

            for(var index in this.rockArray){
                var a:ISpaceRock = this.rockArray[index];
                a.update();

            }

            this.findCoalition();
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
            console.log(roca);

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

        private findCoalition(){

            var distance;
            var radio_ship = 6;
            var radio_roca = 8;
            for(var index in this.rockArray){
                var a = {x:this.ship.x, y:this.ship.y};
                var b = {x:this.rockArray[index]['x'], y:this.rockArray[index]['y']};
               distance = getDistance(a,b);
                //radio_roca = this.rockArray.radio;
                //distance = Math.sqrt(((a.x-b['x'])*(a.x-b['x'])) + ((a.y-b['y'])*(a.y-b['y'])));

                if(distance < (radio_ship+radio_roca)){
                    this.ship.coalition();
                }

            }
        }
    }
}