/**
 * Created by had on 1/29/15.
 */

/// <reference path="../display/SpaceShip.ts" />
/// <reference path="../display/Bullets.ts" />
/// <reference path="../ui/Keyboard.ts" />

module com.spacewarsts.ammo {

    import Spaceship= display.Spaceship;
    import Bullet= display.Bullets;
    import Keyboard = ui.Keyboard;

    export class Gun {

        private bulletArray:Array<Bullet>;
        private bulletCurrentTime: number;
        private deltaTime:number;

        static BULLET_MAX_INTERVAL:number = 1000;

        constructor(private ship:Spaceship) {
            this.bulletArray= [];
            this.bulletCurrentTime= 0;
        }

        public update(delta:number): void {

            this.deltaTime = delta;

            this.shoot();

            for(var index in this.bulletArray){
                var b:Bullet = this.bulletArray[index];
                b.update();
            }
        }

        private shoot(){
            if(Keyboard.isKeyDown(Keyboard.SHOOT_KEY)){
                if(this.bulletCurrentTime<=0){
                    console.log("pum, pum, pum, pum");
                    this.createBullet();
                    this.bulletCurrentTime = Gun.BULLET_MAX_INTERVAL;
                }else{
                    this.bulletCurrentTime -= this.deltaTime;
                }
            }else{
                this.bulletCurrentTime = 0;
            }
        }

        private createBullet():void {
            var b= new Bullet({xPos:this.ship.x, yPos:this.ship.y, angle:this.ship.rotation});
            this.bulletArray.push(b);
            this.ship.parent.addChild(b);
        }
    }
}