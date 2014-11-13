/**
 * Created by Richard on 13/11/2014.
 */

var rps = rps || {};

(function(){

    rps.Game = function Game(stage){

        var hand = new rps.HandView('paper', 'right');
        stage.addChild(hand);
        stage.update();
    }

})();