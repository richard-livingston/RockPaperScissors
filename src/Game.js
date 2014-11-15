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

        var self = this;

        var stage = this.stage = new createjs.Stage(element.find('canvas')[0]),
            model = this.model = new rps.GameModel(),
            gameStartView = new rps.GameStartView(this),
            gameRevealView = new rps.GameRevealView(this);

        switchView(gameStartView);
        stage.addEventListener('handSelected', onHandSelected);

        function onHandSelected(event){
            if(model.newRound(event.selection)){
                switchView(gameRevealView);
            }
        };

        var currentView;
        function switchView(view){
            if(currentView && currentView != view){
                stage.removeChild(currentView);
            }

            stage.addChild(currentView = view);
            stage.update();
        };
    }

})();