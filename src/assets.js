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
        {id : 'text/begin', src : 'images/text/begin.png'}
    ]);

    rps.assets = queue;

})();