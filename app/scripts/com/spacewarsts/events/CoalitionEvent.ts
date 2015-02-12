
/// <reference path="./../display/ISpaceRock.ts" />
/// <reference path="./../display/Bullets.ts" />

 module com.spacewarsts.events {

     import Bullet = display.Bullets;
     import ISpaceRock = display.ISpaceRock;


     export class CoalitionEvent extends createjs.Event {

         static ROCK_SHIP_COALITION_EVENT = "CoalitionManager.RockShipCoalitionEvent";
         static BULLET_ROCK_COALITION_EVENT = "CoalitionManager.BulletRockCoalitionEvent";

         public bulletRockCoalitionData:{bullet:Bullet; rock:ISpaceRock};

        constructor (type:string) {
            super(type, false, false);
        }
   }
 }