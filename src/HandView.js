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
    function HandView(type, direction){
        createjs.Container.call(this);

        this.type = type;
        this.direction = direction = direction == 'right' ? 'right' : 'left';

        if(!~['rock', 'paper', 'scissors'].indexOf(type)){
            throw new Error('Hand type should be either rock, paper, scissors: ' + type);
        }

        var handImage = new createjs.Bitmap(rps.assets.getResult('hand/' + type));

        // Hand already points to the left only need to rotate right
        if(direction == 'right'){
            handImage.scaleX = -1;
            handImage.x += handImage.image.width;
        }

        this.addChild(handImage);
    }

    HandView.prototype = new createjs.Container();

    rps.HandView = HandView;

})();