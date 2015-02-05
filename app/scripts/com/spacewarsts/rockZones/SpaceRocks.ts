/**
 * Created by had on 2/3/15.
 */
/**
 * Created by had on 1/29/15.
 */

/// <reference path="../display/Asteroids.ts" />

module com.spacewarsts.rockZones {

    import Asteroids= display.Asteroids;

    export class SpaceRocks {

        private rockTarget;
        private rockArray;
        private stage;
        private deltaTime;
        private rockCurrentTime;
        private ship;

        static ROCK_MAX_INTERVAL:number = 2000;


        constructor(stage, ship) {
            this.rockArray= [];
            this.rockCurrentTime= 0;

            //this.rockTarget= {x:stage.canvas.clientWidth/2, y:stage.canvas.clientHeight/2};
            this.ship= ship;
            this.stage= stage;
        }

        public update(delta): void {
            this.deltaTime = delta;
            this.shoot();

            for(var index in this.rockArray){
                var a:Asteroids = this.rockArray[index];
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
            //this.rockTarget= {x:this.stage.canvas.clientWidth/2, y:this.stage.canvas.clientHeight/2};
            this.rockTarget= {x: this.ship.x, y: this.ship.y};
            var a= new Asteroids(this.rockTarget);
            console.log(this.rockTarget)
            this.rockArray.push(a);
            this.stage.addChild(a);
        }
    }
}