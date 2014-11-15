/**
 * Created by Richard on 13/11/2014.
 */

var rps = rps || {};

(function(){

    /**
     * This view is the first screen of the game, it gives the user a choice of bet (rock, paper, scissors)
     *
     * @param {Game} game Current game instance
     * @constructor
     */
    function GameStartView(game){
        createjs.Container.call(this);

        var self = this;

        var rock = new rps.HandView('rock'),
            paper = new rps.HandView('paper'),
            scissors = new rps.HandView('scissors');

        // Width of all elements is not exactly the same
        var totalWidth = rock.getBounds().width + paper.getBounds().width + scissors.getBounds().width + 40; /* 20 padding between each */

        // Position and add the hands selection
        rock.x = game.stage.canvas.width - totalWidth;
        paper.x = rock.x + rock.getBounds().width + 20;
        scissors.x = paper.x + paper.getBounds().width + 20;
        rock.y = paper.y = scissors.y = 50;

        rock.throbbingAnimation();
        paper.throbbingAnimation();
        scissors.throbbingAnimation();

        this.addChild(rock);
        this.addChild(paper);
        this.addChild(scissors);

        // Add the instructions text
        var beginGameText = new createjs.Bitmap(rps.assets.getResult('text/begin'));
        this.addChild(beginGameText);

        // Animate the text when the view is added
        this.addEventListener('addedToStage', function onAddedToStage(){
            beginGameText.x = game.stage.canvas.width / 2;
            beginGameText.y = game.stage.canvas.height;
            beginGameText.scaleX = beginGameText.scaleY = 0;

            createjs.Tween.get(beginGameText).to({
                x : beginGameText.x - beginGameText.image.width / 2,
                y : beginGameText.y - beginGameText.image.height,
                scaleX : 1,
                scaleY : 1
            }, 600);
        });

        // Listen for hand clicks
        rock.addEventListener('click', onHandClick);
        paper.addEventListener('click', onHandClick);
        scissors.addEventListener('click', onHandClick);

        function onHandClick(event){
            var e = new createjs.Event('handSelected', true, true);

            e.selection = event.currentTarget.type;
            self.dispatchEvent(e);
        };
    };

    GameStartView.prototype = new createjs.Container();
    rps.GameStartView = GameStartView;

})();