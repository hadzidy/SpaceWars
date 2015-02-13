/**
 * Created by had on 2/12/15.
 */
/// <reference path="../display/Bullets.ts" />

module com.spacewarsts.utils {

    import Bullet = display.Bullets;

    export class BulletPool  {

        private _allBullets:Array<Bullet> = [];

        constructor() {
            this.initAllocations(25);
        }

        private initAllocations(max:number):void {
            for (var i = 0; i < max; i++ ) {
                this._allBullets.push(new Bullet());
            }
        }

        //regresa instancia de bullet
        alloc():Bullet {

            var bullet:Bullet;

            console.log("_allBullets: ", this._allBullets.length);

            if (this._allBullets.length < 1) {
                bullet = new Bullet();
            } else {
                bullet = this._allBullets.pop();
            }

            return bullet;
        }

        //vuelve a ingresar una instancia al pool de Bullets
        free(target:Bullet):void {
            this._allBullets.push(target);
        }
    }
}
