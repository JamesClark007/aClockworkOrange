class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('ground', 'assets/spooky_background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('cop', './assets/cop.png');


        this.load.image('light', './assets/light.png');

    }

    create() {
        const groundY = game.config.height - borderUISize - borderPadding;
        this.ground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'ground').setOrigin(0, 0);


        this.player = new Player(this, game.config.width / 4, groundY + 30, 'player', groundY).setOrigin(0.5, 1);
        // Add the cop to the scene


        //testing code
        //this.cop = new Cop(this, 0 , groundY - 200, 'cop', { start: 0 , end: game.config.width });

        this.cop = new Cop(this, 0 , groundY - 200, 'cop', { start: game.config.width , end: 0 });


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


    }

    update() {
        this.player.update();


        this.cop.update(this.player);

        // If cop is alerted, reset the level
        if (this.cop.alerted) {
            this.scene.restart();
        }

    }

    // Function to change enemy patrol routes
    changePatrolRoutes() {
        // Implement logic to change enemy patrol routes here
    }
}
