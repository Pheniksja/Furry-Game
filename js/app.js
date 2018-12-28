// konstruktor  `Furry()`, któremu zdefiniuj następujące właściwości:
function Furry (x,y, direction) {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};


function Coin (x,y) {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

//preparation the game management
function Game () {
     var self = this;
     this.board =document.querySelectorAll('#board>div');
     this.furry=new Furry();
     this.coin=new Coin();
     this.score = 0;
     var scoreVal = document.querySelector("#score strong");


     //Calculation of position.
    this.position = function(x,y) {
        return x + (y * 10);
    };

    // rendering furry
    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[this.position(this.furry.x, this.furry.y)].classList.add('furry');
    };

    // hide last position Furry (remove class)
    this.hideVisibleFurry = function () {
        var divFurry = document.querySelector('.furry');
        if (divFurry) {
            divFurry.classList.remove('furry')}
    };

    // rendering coin
    this.showCoin = function () {
        this.board[this.position(this.coin.x, this.coin.y)].classList.add('coin');
    };


    //changing direcktion Furry
    this.moveFurry = function () {
        if (self.furry.direction === 'right') {
            self.furry.x = self.furry.x + 1;
        } else if (self.furry.direction === 'left') {
            self.furry.x = self.furry.x - 1;
        }  else if (self.furry.direction === 'up') {
            self.furry.y = self.furry.y - 1;
        } else if(self.furry.direction === 'down') {
            self.furry.y = self.furry.y + 1;
        };
        self.gameOver ();
        self.showFurry();
        self.checkCoinCollision ();
    };

        // Keyboard support
    this.turnFurry= function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        };
    };
    document.addEventListener('keydown', function(event) {
        self.turnFurry(event);
    });

        //getting a point
    this.checkCoinCollision = function() {
        if (this.coin.x === this.furry.x && this.coin.y===this.furry.y) {
            this.board[this.position(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score +=1;
            scoreVal.innerText = this.score;
            this.coin=new Coin();
            this.showCoin();
        }
    }
        //game Over
    this.gameOver = function () {
        if (this.furry.x < 0 ||  this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval)
            this.hideVisibleFurry ();
            alert('Game over! You scored ' + this.score + ' points.');
            console.log("GAME OVER!");

        }
    }

    //start game
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 350);
    }
}

var game = new Game();
game.showCoin();
game.showFurry();
game.startGame();
// document.addEventListener('keydown', game.turnFurry);
