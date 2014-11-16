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

        var finishedPlaying = false;

        var restartText = new createjs.Bitmap(rps.assets.getResult('text/restart')),
            winText = new createjs.Bitmap(rps.assets.getResult('text/win')),
            loseText = new createjs.Bitmap(rps.assets.getResult('text/lose')),
            drawText = new createjs.Bitmap(rps.assets.getResult('text/draw')),
            gameOverText = new createjs.Bitmap(rps.assets.getResult('text/gameOver'));

        this.addEventListener('addedToStage', playAnimation);
        this.addEventListener('removedFromStage', this.removeAllChildren.bind(this));

        // Start a new round on click anywhere
        this.addEventListener('click', function onClick(event){
            if(finishedPlaying && game.model.balance){
                self.dispatchEvent(new createjs.Event('restart'), true, true);
            }
        });

        // Set hit area so that even transparent areas register a click
        this.hitArea = new createjs.Shape();
        this.hitArea.graphics.beginFill('#000000');
        this.hitArea.graphics.drawRect(this.x, this.y, game.stage.canvas.width, game.stage.canvas.height);

        function playAnimation(){
            finishedPlaying = false;

            displayHand(new rps.Hand(game.model.computersMove, 'right')).setPaused(false);
            displayHand(new rps.Hand(game.model.playersMove, 'left')).setPaused(false)
                .play(displayWinMessageText()
                    .play(displayBottomText()
                        .call(function onDisplayRestartTextFinished(){
                            self.dispatchEvent('finishedPlaying');
                            finishedPlaying = true;
                        })));
        }

        function displayHand(hand){
            var dir = hand.direction;

            hand.x = dir == 'right' ? - hand.getBounds().width : game.stage.canvas.width;
            hand.y = 50;

            self.addChild(hand);

            return createjs.Tween.get(hand, {paused : true}).to({
                x : dir == 'right' ? 0 : hand.x - hand.getBounds().width
            }, 400);
        }

        function displayWinMessageText(){
            var image;

            switch(game.model.roundWinnings){
                case 0:
                    image = loseText;
                    break;

                case game.model.betAmount:
                    image = drawText;
                    break;

                default:
                    image = winText;
                    break;
            }

            image.scaleX = image.scaleY = 0;
            image.x = game.stage.canvas.width / 2;
            image.y = game.stage.canvas.height / 2;

            self.addChild(image);

            return createjs.Tween.get(image, {paused : true})
                .wait(400)
                .to({
                    scaleX : 1,
                    scaleY : 1,
                    x : image.x - image.image.width / 2,
                    y : image.y - image.image.height / 2
                }, 500);
        }

        function displayBottomText(){
            var text = game.model.balance > 0 ? restartText : gameOverText;

            text.x = (game.stage.canvas.width - text.image.width) / 2;
            text.y = - text.image.height;

            self.addChild(text);

            return createjs.Tween.get(text, {paused : true})
                .wait(200)
                .to({
                    y : game.stage.canvas.height - text.image.height
                }, 1000, createjs.Ease.bounceOut);
        }
    }

    GameRevealView.prototype = new createjs.Container();
    rps.GameRevealView = GameRevealView;

})();