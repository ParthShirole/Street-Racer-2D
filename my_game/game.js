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
var gameOver = true;
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
        this.load.spritesheet('star', 'assets/star.png',{frameWidth:22,frameHeight:22});
        // this.load.bitmapFont("pixelFont","assets/VCR_OSD_MONO_1.001.ttf");
        
    }

    create(){
        // Spawn the road, player and enemy
        this.road = this.add.tileSprite(width/2, (height/2)-100,0,0, 'road');
        this.road.setScale(2);
        // this.road.setOrigin(0,0);
        // this.road.setScrollFactor(2);
        this.player = this.physics.add.sprite(width/2, 9*height/10, 'player');
        // this.cameras.main.startFollow(this.player);

        this.enemy=this.physics.add.sprite(800,80,'enemy')
        
        this.star=this.physics.add.sprite(800,350,'star')
        this.star.setScale(2);
        

        scoreText = this.add.text(500, 30, 'score: 0', { fontSize: '42px', fill: '#fff' });
        
       
        // Various collide functions
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.road);
        this.physics.add.collider(this.enemy, this.road);
        this.physics.add.collider(this.player, this.enemy,this.overgame,null,this);
        this.physics.add.overlap(this.enemy, this.star);
        this.physics.add.overlap(this.player, this.star,this.pickstar,null,this);
        
        

        // this.createCursor();
    
    }

    update(){
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
                gameOver = false;
        }

        if (gameOver)
        {
        return;
         }
         
        // Call the cursor function
        this.createCursor();
        // this.road.tilePositionY=this.myCam.scrollY*.3;
        // This make the road move
        
        this.road.tilePositionY -= 20;
        // this.road.tilePositionY=this.myCam.scrollY*.3;
        // Call the function to move the enemy
        this.moveEnemy(this.enemy);
        this.movestar(this.star);

    }

    createCursor(){
        // Initializing the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();


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
        enemy.y += 15;

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
        enemy.x = Phaser.Math.Between((width/3),(2*(width)/3))
    }
    resetStarPos(star){
        star.y = 0;
        star.x = Phaser.Math.Between((width/3),(2*(width)/3))
    }

 pickstar(player,star){

    star.disableBody(true,true);

    score += 10;
    scoreText.setText('Score: ' + score);
 
    star.enableBody(true,50,50,true,true);
    this.movestar(star);
    this.resetStarPos(star);   
 }
 overgame(player,enemy){
     gameOver =true;
     scoreText = this.add.text(730, 400, 'Game over', { fontSize: '84px', fill: '#fff' });
     scoreText = this.add.text(780,500, 'Your Score: 0', { fontSize: '44px', fill: '#fff' });
     scoreText.setText('Your Score: ' + score);
     this.time.addEvent({
        delay: 50,
        callback: ()=>{
            enemy.destroy();
            player.destroy();
        },
        loop: true
    }) 
    
 }

}


