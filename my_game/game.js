var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// this.anchor.set(0.5);
// this.game.physics.enable(this, Phaser.Physics.ARCADE);
// this.body.collideWorldBounds = true;
// this.cursors = game.input.keyboard.createCursorKeys();
// this.speed = 5;
// this.scale.x = 0.7;
// this.scale.y = 0.7;
// this.spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
// this.spacekey.onDown.add(this.dodge,this);

function preload ()
{
    this.load.image('road', 'assets/road.png');
    this.load.image('player', 'assets/player.png');
}

function create ()
{
    this.add.image(950, 400, 'road');
    this.add.image(950, 700, 'player');
    this.cursors = game.input.keyboard.createCursorKeys();
    this.speed = 5;
    this.scale.x = 0.7;
    this.scale.y = 0.7;
}

function update ()
{
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