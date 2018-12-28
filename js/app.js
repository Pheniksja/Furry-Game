// konstruktor  `Furry()`, któremu zdefiniuj następujące właściwości:
function Furry (x,y, direction) {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

function Coin (x,y) {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

//preparation the game management
function Game () {
     this.board =document.querySelectorAll('#board>div');
     this.furry=new Furry();
     this.coin=new Coin();
     this.score = document.querySelector('#score');
     score = 0;
     var self = this;

     //Calculation of position.
    this.position = function(x,y) {
        return x + (y * 10);
    }
    // rendering furry
    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[this.position(this.furry.x, this.furry.y)].classList.add('furry');
    };


    // rendering coin
    this.showCoin = function () {
        this.board[this.position(this.coin.x, this.coin.y)].classList.add('coin');
    };

    //start game
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 2500);
    }

    //chanching direcktion Furry
    this.moveFurry = function () {
        if (self.furry.direction === 'right') {
            self.furry.x = self.furry.x + 1;
        } else if (self.furry.direction === 'left') {
            self.furry.x = self.furry.x - 1;
        }  else if (self.furry.direction === 'up') {
            self.furry.y = self.furry.y - 1;
        } else if(self.furry.direction === 'down') {
            self.furry.y = self.furry.y + 1; }
        this.showFurry()
    };
    // hide last position Furry (remove class)
    this.hideVisibleFurry = function () {
        var divFurry = document.querySelector('.furry');
        if (divFurry) {
        divFurry.classList.remove('furry')}
        }

}

var game = new Game();
// game.showCoin();
game.showFurry();
game.startGame();
// game.moveFurry ();