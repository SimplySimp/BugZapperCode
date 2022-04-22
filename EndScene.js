class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' })
	}
	preload() {
  this.load.image('background', 'https://aws1.discourse-cdn.com/codecademy/original/5X/2/8/8/b/288b5e9ffe7a212f9aefe01496abf3a5d829d3aa.png');
}
	create() {
  let bg=this.add.image(195,250,"background");
		this.add.text( 5, 15, 'Too Bad...You Died', {fill: '#ffffff', fontSize: '20px'})
  		this.add.text( 25, 45, 'Man this is really just like Dark Souls', {fill: '#ffffff', fontSize: '17px'})
	    this.add.text( 20, 75, 'Maybe go play those before trying this game...Or just do better.', {fill: '#ffffff', fontSize: '11px'})
  		this.add.text( 0, 100, 'Either way I dont care....Maybe I do a little', {fill: '#ffffff', fontSize: '15px'})
    	this.add.text( 10, 120, 'Click to return to main menu', {fill: '#ffffff', fontSize: '20px'})
    	this.add.text( 5, 150, 'Oh and if you were curious your score was: ', {fill: '#ffffff', fontSize: '14px'})
   gameState.scoreText = this.add.text(370, 150, '0', { fontSize: '15px', fill: '#ffffff' });
   gameState.scoreText.setText(`${gameState.score}`);
		this.input.on('pointerdown', () => {
			this.scene.stop('EndScene')
			this.scene.start('StartScene')
		})

	}
}
