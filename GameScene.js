class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
  this.load.image('bug1', 'EnemySpaceshipV2 (1).png');
  this.load.image('platform', 'SpaceDodgeBarrier.png');
  this.load.image('codey', 'PlayerShipV2.png');
  this.load.image('background', 'PixelStartBackground.png');
  this.load.image('safePlatform', 'SpaceDodgeBarrier.png')
}

	create() {
  let bg=this.add.image(195,250,"background");
  
  gameState.player = this.physics.add.sprite(225, 50, 'codey').setScale(.2);
  
  const platforms = this.physics.add.staticGroup();
 
  platforms.create(225, -20, 'platform').setScale(1, .5).refreshBody();
  platforms.create(225, 520, 'platform').setScale(1, .5).refreshBody();
 
  gameState.scoreText = this.add.text(195, 5, 'Score: 0', { fontSize: '15px', fill: '#000000' });
 
  gameState.player.setCollideWorldBounds(true);
 
  this.physics.add.collider(gameState.player, platforms);
  
  gameState.cursors = this.input.keyboard.createCursorKeys();
 
  const bugs = this.physics.add.group();
 
  function bugGen () {
    const xCoord = Math.random() * 450;
    bugs.create(xCoord, 450, 'bug1');
  }
 
  const bugGenLoop = this.time.addEvent({
    delay: 150,
    callback: bugGen,
    callbackScope: this,
    loop: true,
  });
 
  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })
  
this.physics.add.collider(gameState.player, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();
    if (gameState.score > 1000) {
    this.add.text(150, 250, 'Game Over! You did great!', { fontSize: '15px', fill: '#ffffff' });
    this.add.text(125, 270, 'Click to End', { fontSize: '15px', fill: '#ffffff' });
    } else if(gameState.score < 1000 && gameState.score > 0) {
    this.add.text(180, 250, 'Game Over! ', { fontSize: '15px', fill: '#fafcff' });
    this.add.text(125, 270, 'Click to End', { fontSize: '15px', fill: '#ffffff' });
    } else if(gameState.score <= 0) {
    this.add.text(125, 250, 'Game Over! Wow, you are bad!', { fontSize: '15px', fill: '#ffffff' });
    this.add.text(152, 270, 'Click to End', { fontSize: '15px', fill: '#FFFFFF' });
    }
   this.input.on('pointerup', () =>{
			this.scene.stop('GameScene')
			this.scene.start('EndScene')
    });
  });
 
gameState.safePlatform = this.physics.add.staticGroup();
  this.physics.add.collider(bugs, gameState.safePlatform, function (bug) {
    bug.destroy();
    gameState.score -= 100;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })
}

	update() {
if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-300);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(300);
  } else if (Phaser.Input.Keyboard.JustDown(gameState.cursors.down)) {
    gameState.safePlatform.create(gameState.player.x, gameState.player.y + 25, 'safePlatform').setScale(.1, .1).refreshBody();
  } else if (gameState.cursors.down.isUp) {
    gameState.player.setVelocityX(0);
  } else {
    gameState.player.setVelocityX(0);
  }
}
}