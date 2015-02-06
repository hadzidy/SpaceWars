/**
 * Created by Greco on 2/4/15.
 */

/// <reference path="./ISpaceRock.ts" />
/// <reference path="../utils/math/IPoint.ts" />

module com.spacewarsts.display {

    import IPoint = utils.math.IPoint;

    export class SpaceRockFactory {

        static ASTEROID_TYPE:number = 1;
        static COMET_TYPE:number = 2;
        static PLANET_TYPE:number = 3;
        static METEORITE_TYPE:number = 4;

        static create (id:number, rockTarget:IPoint):ISpaceRock {
            var a:ISpaceRock;
            switch(id){
                case SpaceRockFactory.ASTEROID_TYPE:
                    a = new Asteroids(rockTarget);
                    console.log('soy tipo 1');
                    break;
                case SpaceRockFactory.COMET_TYPE:
                    a = new Comet(rockTarget);
                    console.log('soy tipo 2');
                    break;

                case SpaceRockFactory.PLANET_TYPE:
                    a = new Planet(rockTarget);
                    console.log('soy tipo 3');
                    break;
                case SpaceRockFactory.METEORITE_TYPE:
                    a = new Meteorites(rockTarget);
                    console.log('soy tipo 4');
                    break;
            }
            return a;
        }
    }
}