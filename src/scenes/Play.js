class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', 'assets/spooky_background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('cop', './assets/cop.png');

        this.load.image('cop2', './assets/cop01.png');
        this.load.image('cop3', './assets/cop02.png');

        this.load.image('box1', './assets/box1.png');
        this.load.image('box2', './assets/box2.png');
        this.load.image('platform', './assets/platform.png');

        this.load.image('light', './assets/light.png');
        this.load.audio('backgroundSound', './assets/sound.wav');




    }

    create() {
        let bgMusic = this.sound.add('backgroundSound', {
            volume: 1,
            loop: true
        });
        bgMusic.play();


        const groundY = game.config.height - borderUISize - borderPadding;
        this.ground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);



        // Create the boxes first
        this.box1 = this.physics.add.sprite(game.config.width / 4, groundY, 'box1').setOrigin(0.5, 1);
        this.box2 = this.physics.add.sprite(game.config.width * 3 / 4 - 150, groundY - 25, 'box2').setOrigin(0.5, 1);

        this.platform = this.physics.add.sprite(game.config.width * 3 / 4, groundY - 20, 'platform').setOrigin(0.5, 1);

        this.platform.body.allowGravity = false;

        // Set the properties of the boxes
        this.box1.body.allowGravity = false;
        this.box2.body.allowGravity = false;
        this.box1.setImmovable();
        this.box2.setImmovable();
        this.platform.setImmovable();
        this.platform.body.setSize(130, 39);




        // Then create the player
        this.player = new Player(this, game.config.width / 4, groundY - 200, 'player', groundY).setOrigin(0.5, 1);


        const ground = this.physics.add.staticGroup({
            key: 'ground',
            repeat: game.config.width / 64, // Assume ground tile width is 64
            setXY: {
                x: 0,
                y: game.config.height,
                stepX: 64
            }
        });
        ground.refresh();
        ground.setVisible(false);

        // ...

        // Add collisions
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, this.box1);
        this.physics.add.collider(this.player, this.box2);

        this.physics.add.collider(this.player, this.platform, null, this.handlePlatformCollision, this);


        this.cop = new Cop(this, 0, groundY - 200, 'cop', {
            start: game.config.width,
            end: 0
        });
        this.cop2 = null;
        this.cop3 = null;

        this.time.delayedCall(15000, () => {
            this.cop2 = new Cop(this, 0, groundY - 200, 'cop2', {
                start: game.config.width,
                end: 0
            });
        }, [], this);

        this.time.delayedCall(30000, () => {
            this.cop3 = new Cop(this, 0, groundY - 200, 'cop3', {
                start: game.config.width,
                end: 0
            });
        }, [], this);



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

        //time
        this.elapsedTime = 0;
        this.elapsedTimeText = this.add.text(0, groundY, 'Score: ', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        }); // Changed fill color and added a default font

        this.elapsedTimeText.setDepth(1);
        //let highScore = 0;  
        this.time.addEvent({
            delay: 1000, // count up every second
            callback: () => {
                this.elapsedTime++;
                this.elapsedTimeText.setText('Score: ' + this.elapsedTime);
                console.log(highScore);
                if (this.elapsedTime > highScore) {
                    highScore = this.elapsedTime;
                }
            },
            callbackScope: this,
            loop: true
        });

        this.platform.visible = true;
        this.platformSolidTime = 5000; // Platform stays solid for 5 seconds
        this.platformCooldownTime = 3000; // Platform reappears after 3 seconds
        this.platformTimerEvent = this.time.addEvent({
            delay: this.platformSolidTime,
            callback: this.makePlatformIntangible,
            callbackScope: this,
            loop: true,
        });


    }


    makePlatformIntangible() {
        // Make the platform invisible and remove its collisions
        this.platform.visible = false;
        this.platform.body.checkCollision.none = true;

        // Set a timer to make the platform tangible again
        this.time.delayedCall(this.platformCooldownTime, this.makePlatformTangible, [], this);
    }

    makePlatformTangible() {
        // Make the platform visible and restore its collisions
        this.platform.visible = true;
        this.platform.body.checkCollision.none = false;

        // Restart the platform timer
        this.platformTimerEvent.reset({ delay: this.platformSolidTime, callback: this.makePlatformIntangible, callbackScope: this, loop: true });
    }




    handlePlatformCollision(player, platform) {
        // Perform the default separation logic.
        if (!this.physics.world.separate(player, platform)) {
            // The player and the platform didn't actually overlap, so there's nothing else to do.
            return;
        }
    
        if (platform.body.checkCollision.none) {
            return false;
        }
    
        // If the player is touching down or touching side (not jumping or falling), set the player's x velocity to 0
        if (player.body.touching.down || player.body.touching.right || player.body.touching.left) {
            player.body.setVelocityX(0);
        }
    
        return true;
    }
    


    update() {

        const speed = 100;

        this.player.update();


        this.cop.update(this.player);
        if (this.cop2) this.cop2.update(this.player);
        if (this.cop3) this.cop3.update(this.player);

        // If cop is alerted, reset the level
        if (this.cop.alerted) {
            this.scene.start("gameOverScene");
        }

        // If cop is alerted, reset the level
        if (this.cop2) {
            if (this.cop2.alerted && (this.cop2)) {
                this.scene.start("gameOverScene");
            }

        }
        if (this.cop3) {
            if (this.cop3.alerted && (this.cop3)) {
                this.scene.start("gameOverScene");
            }

        }

        if (this.platform.x <= 200) {
            this.platform.body.setVelocityX(speed); // Move to the left
        }

        // Check if platform has reached the left edge
        if (this.platform.x >= this.platform.width - 200) {
            this.platform.body.setVelocityX(-speed); // Move to the right
        }

        if (this.player.body.wasTouching.down && !this.player.body.touching.down) {
            this.player.body.setVelocityX(0);
        }

    }


}