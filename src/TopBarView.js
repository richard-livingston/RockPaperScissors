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

        var isRoundInProgress = false,
            previousBalance = 0;

        /**
         * Disable or enable the fields and controls
         *
         * @param {bool} disabled True to disable, false to enable
         */
        this.roundInProgress = function roundInProgress(inProgress){
            var controls = betControlDown.add(betControlUp);
            isRoundInProgress = inProgress;

            controls[inProgress ? 'addClass' : 'removeClass']('disabled');
            updateFields();
        };

        updateFields();
        m.addEventListener('propertyChanged', updateFields);

        betControlUp.add(betControlDown).on('click', function onBetControlClick(){
            if(isRoundInProgress){
                return;
            }

            if(this == betControlUp[0]){
                m.betAmount += 100;
            }
            else{
                m.betAmount -= 100;
            }
        });

        function updateFields(){
            balanceField.text(((isRoundInProgress ? previousBalance - m.betAmount : m.balance) / 100).toFixed(2));

            if(!isRoundInProgress){
                betsField.text((m.betAmount / 100).toFixed(2));
                previousBalance = m.balance;
            }
        }
    };


    rps.TopBarView = TopBarView;

})();