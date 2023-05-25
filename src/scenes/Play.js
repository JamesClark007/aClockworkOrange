class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
  
    preload() {
        this.load.image('ground', 'assets/spooky_background.png');
        this.load.image('player', 'assets/player.png');
    }
    
    create() {
        const groundY = game.config.height - borderUISize - borderPadding;
        this.ground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'ground').setOrigin(0, 0);
  
        this.player = new Player(this, game.config.width / 4, groundY + 30, 'player', groundY).setOrigin(0.5, 1);
  
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
  
    update() {
        this.player.update();
    }
}
