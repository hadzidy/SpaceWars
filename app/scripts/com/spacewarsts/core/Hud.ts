/**
 * Created by had on 2/6/15.
 */

module com.spacewarsts.core {

    export class Hud extends createjs.EventDispatcher {
        public scoreInput;
        public timeInput;
        private _score:number;
        private _timeCounter;


        constructor () {
            super();


            this._score = 0;
            this._timeCounter= 0;
            this.scoreInput = new createjs.Text('score: '+this._score, '20px Arial', "#ffffff");
            this.timeInput = new createjs.Text(this._timeCounter, '20px Arial', "#ffffff");

            this.scoreInput.x = 300;
            this.scoreInput.y = 10;
            this.timeInput.x = 450;
            this.timeInput.y = 10;
        }

        update():void {

        }


       set score(rockValue:number) {
          this._score+=rockValue;
            this.scoreInput.text = 'score: '+this._score;

       }
       set timer(time){
           this._timeCounter = (Math.round(time / 100)/ 10).toFixed(1);
           this.timeInput.text = this._timeCounter;
        }

    }
}