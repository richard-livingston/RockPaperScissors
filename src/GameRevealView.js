/**
 * Created by Richard on 15/11/2014.
 */

var rps = rps || {};

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

        var restartText = new createjs.Bitmap(rps.assets.getResult('text/restart'));

        this.addEventListener('addedToStage', function onAddedToStage(event){
            displayHands(game.model.computersMove, game.model.playersMove);
            displayRestartText();
        });

        this.addEventListener('removedFromStage', function onRemovedFromStage(event){
            computersHand && self.removeChild(computersHand);
            playersHand && self.removeChild(playersHand);
        });

        // Start a new round on click anywhere
        this.addEventListener('click', function onClick(event){
            self.dispatchEvent(new createjs.Event('restart'), true, true);
        });

        // Set hit area so that even transparent areas register a click
        this.hitArea = new createjs.Shape();
        this.hitArea.graphics.beginFill('#000000');
        this.hitArea.graphics.drawRect(this.x, this.y, game.stage.canvas.width, game.stage.canvas.height);

        function displayHands(computer, player){
            computersHand = new rps.HandView(game.model.computersMove, 'right');
            playersHand = new rps.HandView(game.model.playersMove, 'left');

            computersHand.x = -computersHand.getBounds().width;
            playersHand.x = game.stage.canvas.width;
            computersHand.y = playersHand.y = 50;

            createjs.Tween.get(computersHand).to({x : 0}, 400);
            createjs.Tween.get(playersHand).to({x : playersHand.x - playersHand.getBounds().width}, 400);

            self.addChild(computersHand);
            self.addChild(playersHand);
        }

        function displayRestartText(){
            restartText.x = (game.stage.canvas.width - restartText.image.width) / 2;
            restartText.y = - restartText.image.height;

            createjs.Tween.get(restartText)
                .wait(600)
                .to({
                    y : game.stage.canvas.height - restartText.image.height
                }, 1000, createjs.Ease.bounceOut);

            self.addChild(restartText);
        }
    }

    GameRevealView.prototype = new createjs.Container();
    rps.GameRevealView = GameRevealView;

})();