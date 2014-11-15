/**
 * Created by Richard on 15/11/2014.
 */

(function(){

    /**
     * Holds the values for the game round
     *
     * @constructor
     */
    function GameModel(){

        createjs.EventDispatcher.initialize(this);

        var self = this;
        var moves = ['rock', 'paper', 'scissors'];

        var _playersMove = null;
        this.__defineGetter__('playersMove', function(){
            return _playersMove;
        });

        var _computersMove = null;
        this.__defineGetter__('computersMove', function(){
            return _computersMove;
        });

        var _betAmount = 0;
        this.__defineGetter__('betAmount', function(){
            return _betAmount;
        });

        var _roundWinnings = 0;
        this.__defineGetter__('roundWinnings', function(){
            return _roundWinnings;
        });

        var _balance = 0;
        this.__defineGetter__('balance', function(){
            return _balance;
        });

        this.__defineSetter__('balance', function(value){
            if(value % 1 != 0){
                throw new TypeError('Balance must be an integer');
            }

            _balance = value;
            notifyPropertyChanged('balance');
        });


        /**
         * Create and process a new round.
         *
         * @param {string} playersMove The player's choice of move
         * @returns {boolean} Returns false if the bet cannot be placed due to low balance
         */
        this.newRound = function(playersMove){
            if(!~moves.indexOf(playersMove)){
                throw new Error('Player\'s move must be one of: ' + moves.join(', ') + ', : ' + playersMove);
            }

            if(_balance < _betAmount){
                return false;
            }

            _balance -= _betAmount;
            _playersMove = playersMove;
            _computersMove = moves[Math.floor(Math.random() * 3)];

            // Calculate winnings
            var playerWins =
                (_computersMove == 'rock' && _playersMove == 'paper') ||
                (_computersMove == 'paper' && _playersMove == 'scissors') ||
                (_computersMove == 'scissors' && _playersMove == 'rock');

            _balance += _roundWinnings = (playerWins ? _betAmount * 3 : 0);

            notifyPropertyChanged('balance');
            notifyPropertyChanged('playersMove');
            notifyPropertyChanged('computersMove');
            notifyPropertyChanged('roundWinnings');

            return true;
        };


        function notifyPropertyChanged(name){
            var e = new createjs.Event('propertyChanged');
            e.name = name;
            self.dispatchEvent(e);
        };
    }

    rps.GameModel = GameModel;

})();