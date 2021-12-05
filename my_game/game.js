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
// Defined globally 
var width = window.innerWidth*window.devicePixelRatio;
var height = window.innerHeight*window.devicePixelRatio;

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    preload(){
        // Load all the images
        this.load.image('road', 'assets/road.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemycar.png');
    }

    create(){
        // Spawn the road, player and enemy
        this.road = this.add.tileSprite(width/2, height/2, 0, 0, 'road');
        this.player = this.physics.add.sprite(width/2, 9*height/10, 'player');
        this.enemy=this.physics.add.sprite(800,300,'enemy')

        // Various collide functions
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.road);
        this.physics.add.collider(this.enemy, this.road);
        this.physics.add.collider(this.player, this.enemy);

        // this.createCursor();
    
    }

    update(){
        // Call the cursor function
        this.createCursor();

        // This make the road move
        this.road.tilePositionY -= 5;

        // Call the function to move the enemy
        this.moveEnemy(this.enemy);

    }

    createCursor(){
        // Initializing the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // If left arrow key is pressed
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-400);
            }
        
        // If right arrow is pressed
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(400);
            }
        
        else{
            this.player.setVelocityX(0);
        }

        // If up arrow key is pressed
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-400);
            }
        
        // If down arrow key is presses
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(400);
            }
        
        else {
            this.player.setVelocityY(0);
        }
    }

    // Function to move the enemy
    moveEnemy(enemy){
        // Increases y coordinate of enemy by 5
        enemy.y += 5;

        // After crossing the screen it spawns back at a random x coordinate
        if (enemy.y > width){
            this.resetEnemyPos(enemy);
        }
    }
    // Function to spwan back at random x coordinate
    resetEnemyPos(enemy){
        enemy.y = 0;
        enemy.x = Phaser.Math.Between(0, width)
    }
}


