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

        static create (id:number):ISpaceRock {
            var a:ISpaceRock;
            switch(id){
                case SpaceRockFactory.ASTEROID_TYPE:
                    a = new Asteroids();

                    break;
                case SpaceRockFactory.COMET_TYPE:
                    a = new Comet();

                    break;

                case SpaceRockFactory.PLANET_TYPE:
                    a = new Planet();

                    break;
                case SpaceRockFactory.METEORITE_TYPE:
                    a = new Meteorites();

                    break;
            }
            return a;
        }
    }
}