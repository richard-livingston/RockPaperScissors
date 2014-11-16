/**
 * Created by Richard on 13/11/2014.
 */

var rps = rps || {};

(function(){

    /**
     *
     * @param {string} type Either rock, paper, scissors
     * @param {string} [direction=left] Either left or right. The direction that the hand points towards
     * @constructor
     */
    function Hand(type, direction){
        createjs.Container.call(this);

        this.type = type;
        this.direction = direction = direction == 'right' ? 'right' : 'left';

        if(!~['rock', 'paper', 'scissors'].indexOf(type)){
            throw new Error('Hand type should be either rock, paper, scissors: ' + type);
        }

        var handImage = new createjs.Bitmap(rps.assets.getResult('hand/' + type));

        /**
         * Display a simple throbbing animation
         *
         * @return {Tween}
         */
        this.throbbingAnimation = function throbbingAnimation(){
            return createjs.Tween.get(handImage, {loop : true})
                .wait(Math.floor(Math.random() * 600)) // Wait so that not all hands move in synchrony
                .to({scaleX : direction == 'right' ? -1.06 : 1.06, scaleY : 1.06}, 2000)
                .to({scaleX : direction == 'right' ? -1 : 1, scaleY : 1}, 2000);
        };

        // Hand already points to the left only need to rotate right
        if(direction == 'right'){
            handImage.scaleX = -1;
            handImage.x += handImage.image.width;
        }

        this.addChild(handImage);
    }

    Hand.prototype = new createjs.Container();

    rps.Hand = Hand;

})();