/**
 * Created by Richard on 15/11/2014.
 */

(function(){

    /**
     * This view reveals the computers move. The computer's hand will be displayed on the left side and player's on the
     * right.
     *
     * @param {Game} game Current game instance
     * @constructor
     */
    function GameRevealView(game){
        createjs.Container.call(this);

        var self = this;

        var computersHand,
            playersHand;

        this.addEventListener('addedToStage', function onAddedToStage(event){
            displayHands(game.model.computersMove, game.model.playersMove);
        });

        this.addEventListener('removedFromStage', function onRemovedFromStage(event){
            computersHand && self.removeChild(computersHand);
            playersHand && self.removeChild(playersHand);
        });

        function displayHands(computer, player){
            computersHand = new rps.HandView(game.model.computersMove, 'right');
            playersHand = new rps.HandView(game.model.playersMove, 'left');

            computersHand.x = 0;
            playersHand.x = game.stage.canvas.width - playersHand.getBounds().width;
            computersHand.y = playersHand.y = 50;

            self.addChild(computersHand);
            self.addChild(playersHand);
            game.stage.update();
        }
    }

    GameRevealView.prototype = new createjs.Container();
    rps.GameRevealView = GameRevealView;

})();