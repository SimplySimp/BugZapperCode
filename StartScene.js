class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}
	preload() {
  this.load.image('background', 'https://aws1.discourse-cdn.com/codecademy/original/5X/2/8/8/b/288b5e9ffe7a212f9aefe01496abf3a5d829d3aa.png');
  this.load.image('title','https://aws1.discourse-cdn.com/codecademy/original/5X/3/7/3/1/3731d5b708b39f5dcc52b85fd4b5f5d4ccd96bff.png');
}
	create() {
  let bg=this.add.image(195,250,"background");

  const titleScreen = this.physics.add.staticGroup();
  titleScreen.create(225, 90, 'title').setScale(.5, .5).refreshBody();

		this.add.text( 140, 175, 'Click to start!', {fill: '#FAB01B', fontSize: '20px'})
  		this.add.text( 20, 200, 'Use left and right arrows to dodge!', {fill: '#FAB01B', fontSize: '20px'})
	    this.add.text( 90, 260, 'Dodge to gain points!', {fill: '#FAB01B', fontSize: '20px'})
  		this.add.text( 10, 300, 'Press down arrow to pull up a protective barrier!', {fill: '#FAB01B', fontSize: '15px'})
    	this.add.text( 70, 340, 'This will lose you points!', {fill: '#FAB01B', fontSize: '20px'})
		  this.input.on('pointerdown', () => {
			this.scene.stop('StartScene')
			this.scene.start('GameScene')
		})
	}
}