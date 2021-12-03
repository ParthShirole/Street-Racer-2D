window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x32CD32,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: window.innerWidth*window.devicePixelRatio,
            height: window.innerHeight*window.devicePixelRatio,
        },
        physics: {
            default: "arcade"
        },
       scene: playGame
    }
    game = new Phaser.Game(gameConfig);
}

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    preload(){
        this.load.image('road', 'assets/road.png');
        this.load.image('player', 'assets/player.png');
    }

    create(){
        
        this.road = this.add.tileSprite(this.game.scale.width/2, this.game.scale.height/2, 0, 0, 'road');
        this.player = this.physics.add.sprite(this.game.scale.width/2, 9*this.game.scale.height/10, 'player');
        this.player.setCollideWorldBounds(true);
        this.createCursor();
    
    }

    update(){
       
        this.createCursor();
        this.road.tilePositionY -= 10;

    }

    createCursor(){

        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            }

        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            }

        else{
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            }
        
        else{
            this.player.setVelocityY(0);
        }
    }
}


