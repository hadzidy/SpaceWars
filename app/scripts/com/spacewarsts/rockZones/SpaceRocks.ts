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

        static ROCK_MAX_INTERVAL:number = 2000;


        constructor(stage) {
            this.rockArray= [];
            this.rockCurrentTime= 0;

            console.log(stage);

            this.rockTarget= {x:stage.canvas.clientWidth/2, y:stage.canvas.clientHeight/2};
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
                console.log("pum, pum, pum, pum");
                this.createRock();
                this.rockCurrentTime = SpaceRocks.ROCK_MAX_INTERVAL;
            }else{
                this.rockCurrentTime -= this.deltaTime;
            }

        }

        private createRock():void {
            var a= new Asteroids(this.rockTarget);
            this.rockArray.push(a);
            this.stage.addChild(a);
        }
    }
}