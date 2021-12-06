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
var score = 0;
var gameOver = false;
var scoreText;

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    preload(){
        // Load all the images
        this.load.image('road', 'assets/road.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemycar.png');
        this.load.image('star', 'assets/star.png');
    }

    create(){
        // Spawn the road, player and enemy
        this.road = this.add.tileSprite(width/2, height/2, 0, 0, 'road');
        this.player = this.physics.add.sprite(width/2, 9*height/10, 'player');
        this.enemy=this.physics.add.sprite(800,300,'enemy')
        this.star=this.physics.add.sprite(800,300,'star')

        // Various collide functions
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.road);
        this.physics.add.collider(this.enemy, this.road);
        this.physics.add.collider(this.player, this.enemy);
        this.physics.add.collider(this.player, this.star);
        this.physics.add.collider(this.enemy, this.star);
        

        // this.createCursor();
    
    }

    update(){
        // Call the cursor function
        this.createCursor();

        // This make the road move
        this.road.tilePositionY -= 20;

        // Call the function to move the enemy
        this.moveEnemy(this.enemy);
        this.movestar(this.star);

    }

    createCursor(){
        // Initializing the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        if (gameOver)
        {
        return;
         }

        // If left arrow key is pressed
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            }
        
        // If right arrow is pressed
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            }
        
        else{
            this.player.setVelocityX(0);
        }

        // If up arrow key is pressed
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
            }
        
        // If down arrow key is presses
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
            }
        
        else {
            this.player.setVelocityY(0);
        }
    }

    // Function to move the enemy
    moveEnemy(enemy){
        // Increases y coordinate of enemy by 5
        enemy.y += 10;

        // After crossing the screen it spawns back at a random x coordinate
        if (enemy.y > width){
            this.resetEnemyPos(enemy);
        }
    }

    movestar(star){
        // Increases y coordinate of enemy by 5
        star.y += 10;

        // After crossing the screen it spawns back at a random x coordinate
        if (star.y > width){
            this.resetStarPos(star);
        }
    }

    // Function to spwan back at random x coordinate
    resetEnemyPos(enemy){
        enemy.y = 0;
        enemy.x = Phaser.Math.Between((width/3)+130,(2*(width)/3)-130)
    }
    resetStarPos(star){
        star.y = 0;
        star.x = Phaser.Math.Between((width/3)+130,(2*(width)/3)-130)
    }

    crash (player, enemy)
{
    this.physics.pause();

    player.setTint(0xff0000);

    // player.anims.play('turn');

    gameOver = true;
}
}


