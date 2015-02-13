/**
 * Created by had on 1/29/15.
 */

/// <reference path="../display/SpaceShip.ts" />
/// <reference path="../display/Bullets.ts" />
/// <reference path="../ui/Keyboard.ts" />
/// <reference path="../utils/BulletPool.ts" />

module com.spacewarsts.ammo {

    import Spaceship= display.Spaceship;
    import Bullet= display.Bullets;
    import Keyboard = ui.Keyboard;
    import BulletPool = utils.BulletPool;

    export class Gun {

        private bulletArray:Array<Bullet>;
        private bulletCurrentTime: number;
        private deltaTime:number;
        private _bulletPool:BulletPool = new BulletPool();

        static BULLET_MAX_INTERVAL:number = 1000;

        constructor(private ship:Spaceship) {
            this.bulletArray= [];
            this.bulletCurrentTime= 0;
        }

        get allBullets(){
            return this.bulletArray;
        }

        public update(delta:number): void {

            this.deltaTime = delta;

            this.shoot();

            for(var index in this.bulletArray) {

                var b:Bullet = this.bulletArray[index];
                b.update();

                if(b.x < 0 || b.x > 800 || b.y < 0 || b.y > 600) {
                    this.bulletArray.splice(index,1);
                    this._bulletPool.free(b);
                }
            }
        }

        private shoot(){
            if(Keyboard.isKeyDown(Keyboard.SHOOT_KEY)){
                if(this.bulletCurrentTime<=0){
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
            var b = this._bulletPool.alloc();
            b.setPosition({xPos:this.ship.x, yPos:this.ship.y, angle:this.ship.rotation});
            this.bulletArray.push(b);
            this.ship.parent.addChild(b);
        }

        public coalitionRemoveBullet(bullet:Bullet):void {
            this.ship.parent.removeChild(bullet);
            var deleteR= this.bulletArray.indexOf(bullet);
            this.bulletArray.splice(deleteR, 1);
            this._bulletPool.free(bullet);
        }
    }
}