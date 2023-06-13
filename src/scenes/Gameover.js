class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        // Create the white bars for the "jail cell" effect
        const barWidth = 23.5;  

        const barHeight = this.scale.height;
        const numBars = Math.ceil(this.scale.width / barWidth);
        
        for(let i = 0; i <= numBars; i++) {
            this.add.rectangle(i * barWidth * 2, 0, barWidth, barHeight, 0xFFFFFF).setOrigin(0, 0);
        }

        // Display the "Game Over" text
        const gameOverText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'GAME OVER', { fontSize: '48px', fill: '#FF0000', fontFamily: 'Arial' });
        gameOverText.setOrigin(0.5, 0.5);  // Center the text
        gameOverText.setBackgroundColor('#000000')

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');    
        }
    }
}
