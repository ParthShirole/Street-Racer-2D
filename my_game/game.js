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
var startText;
var loop;

var musicConfig ={
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
};
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    preload(){
        // Load all the images
        this.load.image('road', 'assets/road_test.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemycar.png');
        this.load.spritesheet('star', 'assets/star.png',{frameWidth:22,frameHeight:22});
        this.load.audio("sound_game", 'assets/sound.mp3');
   
        
    }

    create(){
        // Spawn the road, player and enemy
        this.road = this.add.tileSprite(width/2, (height/2),0,0, 'road');
        this.road.scaleY = 1.5;
        this.road.scaleX = 1.8;
       
        this.player = this.physics.add.sprite(width/2, 9*height/10, 'player');
       

        this.enemy=this.physics.add.sprite(800,80,'enemy')
        
        this.star=this.physics.add.sprite(800,350,'star')
        this.star.setScale(2.4);
        
        startText = this.add.text(220, 580, 'Press SPACE to START', { fontSize: '36px', fill: '#fff' });
        scoreText = this.add.text(1650, 30, 'score: 0', { fontSize: '42px', fill: '#fff' });
        this.music = this.sound.add('sound_game');
        
        
       
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
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
                gameOver = false;
                startText.destroy();
                this.music.play(musicConfig);  
                    
            }
            if(Phaser.Input.Keyboard.JustDown(this.enter)){
                this.music.stop(musicConfig);
                score=0;
                this.scene.restart();       
                }
        
        
            
            if (gameOver)
            {
            // scoreText = this.add.text(530, 430, 'Press SPACE to START', { fontSize: '72px', fill: '#fff' });
            // loop =true;
            return;
            }
          
        // if (gameOver)
        // {
        // return;
        //  }
         
        // Call the cursor function
        this.createCursor();
        // this.road.tilePositionY=this.myCam.scrollY*.3;
        // This make the road move
        
        this.road.tilePositionY -= 9;
        // this.road.tilePositionY=this.myCam.scrollY*.3;
        // Call the function to move the enemy
        this.moveEnemy(this.enemy);
        this.movestar(this.star);

    }

    createCursor(){
        // Initializing the cursor keys
        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});


        // If left arrow key is pressed
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            console.log('left');
            }
        
        // If right arrow is pressed
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            console.log('right');
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
        enemy.x = Phaser.Math.Between((width/3)+120,(2*(width)/3)-120)
    }
    resetStarPos(star){
        star.y = 0;
        star.x = Phaser.Math.Between((width/3)+120,(2*(width)/3)-120)
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
     scoreText = this.add.text(580, 270, 'Game over', { fontSize: '134px', fill: '#fff' });
     scoreText = this.add.text(730,430, 'Your Score: 0', { fontSize: '54px', fill: '#fff' });
     scoreText.setText('Your Score: ' + score);
     scoreText = this.add.text(430, 530, 'Press ENTER to Play Again', { fontSize: '72px', fill: '#fff' });
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




