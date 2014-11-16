/**
 * Created by Richard on 13/11/2014.
 */

var rps = rps || {};

(function(){

    var queue = new createjs.LoadQueue();
    queue.loadManifest([
        {id : 'hand/rock', src : 'images/hand/rock.png'},
        {id : 'hand/paper', src : 'images/hand/paper.png'},
        {id : 'hand/scissors', src : 'images/hand/scissors.png'},
        {id : 'text/begin', src : 'images/text/begin.png'},
        {id : 'text/restart', src : 'images/text/restart.png'},
        {id : 'text/win', src : 'images/text/win.png'},
        {id : 'text/lose', src : 'images/text/lose.png'},
        {id : 'text/draw', src : 'images/text/draw.png'}
    ]);

    rps.assets = queue;

})();