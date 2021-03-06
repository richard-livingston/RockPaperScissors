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

        this.element = element;

        var stage = this.stage = new createjs.Stage(element.find('canvas')[0]),
            model = this.model = new rps.GameModel(),
            topBar = new rps.TopBar(this),
            gameStartView = new rps.GameStartView(this),
            gameRevealView = new rps.GameRevealView(this);

        createjs.Ticker.addEventListener('tick', stage);

        // Set default values
        model.balance = 2500;
        model.betAmount = 100;

        switchView(gameStartView);
        stage.addEventListener('handSelected', onHandSelected);
        gameRevealView.addEventListener('finishedPlaying', topBar.roundInProgress.bind(topBar, false));
        gameRevealView.addEventListener('restart', switchView.bind(null, gameStartView));

        function onHandSelected(event){
            topBar.roundInProgress(true);

            if(model.newRound(event.selection)){
                switchView(gameRevealView);
            }
            else{
               topBar.roundInProgress(false);
            }
        };

        var currentView;
        function switchView(view){
            if(currentView && currentView != view){
                stage.removeChild(currentView);
                view.dispatchEvent('removedFromStage');
            }

            stage.addChild(currentView = view);
            stage.update();

            view.dispatchEvent('addedToStage');
        };
    }

})();