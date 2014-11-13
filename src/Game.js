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

        var stage = new createjs.Stage(element.find('canvas')[0]);
        var hand = new rps.HandView('paper', 'right');

        stage.addChild(hand);
        stage.update();
    }

})();