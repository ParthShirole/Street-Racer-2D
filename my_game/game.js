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
    this.load.image('enemy', 'assets/enemycar.png');
    }

    create(){
    this.road=this.add.tileSprite(this.game.scale.width/2, this.game.scale.height/2,0,0, 'road');
    // this.add.image(this.game.scale.width/2, 9*this.game.scale.height/10, 'player');
    this.player = this.physics.add.sprite(this.game.scale.width/2, 9*this.game.scale.height/10, 'player');
    // this.physics.world.setBounds(0, 0, this.game.scale.width, this.game.scale.height);
    this.enemy=this.physics.add.sprite(800,300,'enemy')
    // this.enemy=this.add.tileSprite(800,300,0,0,'enemy')
    this.player.setCollideWorldBounds(true);
    this.enemy.setCollideWorldBounds(true);
    
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.road);
    this.physics.add.collider(this.enemy, this.road);
    this.physics.add.collider(this.player, this.enemy);
    
    // this.speed = 5;
    
    }

    update(){
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-500);
        }

    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(500);
        }

    else{
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-500);
        }
    else if (this.cursors.down.isDown) {
        this.player.setVelocityY(500);
        }
    
    else{
        this.player.setVelocityY(0);
    }
    // this.enemy.tilePositionY -= 5;
    this.road.tilePositionY -= 10;

    }
}


