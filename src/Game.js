/**
 * Created by Richard on 13/11/2014.
 */

var rps = rps || {};

(function(){

    /**
     * Construct a new game on the given element
     *
     * @param {JQuery} element
     * @constructor
     */
    rps.Game = function Game(element){

        var stage = rps.stage = new createjs.Stage(element.find('canvas')[0]);
        var gameStartView = new rps.GameStartView();

        stage.addChild(gameStartView);
        stage.update();

        stage.addEventListener('handSelected', onHandSelected);

        function onHandSelected(event){
            console.log(event);
        };
    }

})();