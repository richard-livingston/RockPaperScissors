/**
 * Created by Richard on 16/11/2014.
 */

var rps = rps || {};

(function(){

    function TopBarView(game){

        var topBar = $('.topBar', game.element),
            betsField = $('.bets .field', topBar),
            balanceField = $('.balance .field', topBar),
            betControlUp = $('.bets .control.up', topBar),
            betControlDown = $('.bets .control.down', topBar);

        var m = game.model;

        updateFields();
        m.addEventListener('propertyChanged', updateFields);

        betControlUp.add(betControlDown).on('click', function onBetControlClick(){
            if(this == betControlUp[0]){
                m.betAmount += 100;
            }
            else{
                m.betAmount -= 100;
            }
        });

        function updateFields(){
            balanceField.text((m.balance / 100).toFixed(2));
            betsField.text((m.betAmount / 100).toFixed(2));
        }
    };


    rps.TopBarView = TopBarView;

})();