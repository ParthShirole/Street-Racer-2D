// var config = {
//     type: Phaser.AUTO,
//     width: 1920,
//     height: 900,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x444444,
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
    this.add.image(this.game.scale.width/2, this.game.scale.height/2, 'road');
    this.add.image(this.game.scale.width/2, this.game.scale.height/2, 'player');
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = 5;
    // this.scale.x = 0.7;
    // this.scale.y = 0.7;
    }

    update(){
    if (this.cursors.left.isDown) {
        this.x -= this.speed;
        }

    else if (this.cursors.right.isDown) {
        this.x += this.speed;
        }

    if (this.cursors.up.isDown) {
        this.y -= this.speed;
        }
    else if (this.cursors.down.isDown) {
        this.y += this.speed;
        }

    }
}


