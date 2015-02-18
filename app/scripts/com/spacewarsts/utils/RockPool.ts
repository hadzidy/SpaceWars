/**
 * Created by had on 2/12/15.
 */
/// <reference path="../display/ISpaceRock.ts" />
/// <reference path="../display/SpaceRockFactory.ts" />

module com.spacewarsts.utils {

    import ISpaceRock = display.ISpaceRock;
    import SpaceRockFactory = display.SpaceRockFactory;

    export class RockPool  {

        private _allRocks:Array<ISpaceRock> = [];

        private static _instace:RockPool = null;

        constructor() {
            this.initAllocations(25);
        }

        static getInstance():RockPool {
            if(RockPool._instace == null) {
                RockPool._instace = new RockPool();
            }
            return RockPool._instace;
        }

        private initAllocations(max:number):void {
            for (var i = 0; i < max; i++ ) {
                var idRock= Math.floor(Math.random() * 4) + 1;
                this._allRocks.push(SpaceRockFactory.create(idRock));
            }
        }

        //regresa instancia de bullet
        alloc():ISpaceRock {

            var rock:ISpaceRock;

            console.log("_allRocks: ", this._allRocks.length);

            if (this._allRocks.length < 1) {
                var idRock = Math.floor(Math.random() * 4) + 1;
                rock= SpaceRockFactory.create(idRock);

            } else {
                rock = this._allRocks.pop();
            }

            return rock;
        }

        //vuelve a ingresar una instancia al pool de Bullets
        free(target:ISpaceRock):void {
            this._allRocks.push(target);
        }
    }
}
