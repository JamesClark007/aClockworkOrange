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

        // Set the camera to follow the player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.5); // Adjust this value to get the desired effect

        // Set the camera bounds to match the game world
        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);

        // Create a timer event that counts down from 60 seconds
        this.timeEvent = this.time.addEvent({
            delay: 60000, // 60 seconds in milliseconds
            callback: this.changePatrolRoutes, // Function to call when the timer reaches 0
            callbackScope: this,
            loop: true // Make the timer loop indefinitely
        });

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // Enable lighting system
        this.lights.enable();
        this.lights.setAmbientColor(0x000000); // Set the ambient light to black

        // Create a spotlight that will follow the player
        this.spotlight = this.lights.addLight(this.player.x, this.player.y, 200); // Radius of 200 pixels
        this.spotlight.setColor(0xffffff); // Set the light color to white
        this.spotlight.setIntensity(1.0); // Set the intensity of the light
    }

    update() {
        this.player.update();

        // Update the position of the spotlight to follow the player
        this.spotlight.x = this.player.x;
        this.spotlight.y = this.player.y;
    }

    // Function to change enemy patrol routes
    changePatrolRoutes() {
        // Implement logic to change enemy patrol routes here
    }
}
