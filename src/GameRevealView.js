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

        var restartText = new createjs.Bitmap(rps.assets.getResult('text/restart')),
            winText = new createjs.Bitmap(rps.assets.getResult('text/win')),
            loseText = new createjs.Bitmap(rps.assets.getResult('text/lose'));

        this.addEventListener('addedToStage', function onAddedToStage(event){
            displayHands(game.model.computersMove, game.model.playersMove);
            displayWinMessageText();
            displayRestartText();
        });

        this.addEventListener('removedFromStage', function onRemovedFromStage(event){
            self.removeAllChildren();
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

        function displayWinMessageText(){
            var image = game.model.roundWinnings ? winText : loseText;

            image.scaleX = image.scaleY = 0;
            image.x = game.stage.canvas.width / 2;
            image.y = game.stage.canvas.height / 2;

            createjs.Tween.get(image)
                .wait(600)
                .to({
                    scaleX : 1,
                    scaleY : 1,
                    x : image.x - image.image.width / 2,
                    y : image.y - image.image.height / 2
                }, 500);

            self.addChild(image);
        }

        function displayRestartText(){
            restartText.x = (game.stage.canvas.width - restartText.image.width) / 2;
            restartText.y = - restartText.image.height;

            createjs.Tween.get(restartText)
                .wait(1500)
                .to({
                    y : game.stage.canvas.height - restartText.image.height
                }, 1000, createjs.Ease.bounceOut);

            self.addChild(restartText);
        }
    }

    GameRevealView.prototype = new createjs.Container();
    rps.GameRevealView = GameRevealView;

})();