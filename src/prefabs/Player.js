class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, groundY) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(500);
        this.body.setSize(this.width * 0.3, this.height * 0.3);
        this.body.setSize(this.width*.5, this.height); 
        this.moveSpeed = 4;
    }

    update() {
        if (keyLEFT.isDown && this.x >= borderUISize + this.width - 100) {
            this.x -= this.moveSpeed + 5;
        }
        if (keyRIGHT.isDown && this.x <= game.config.width - 200) { 
            this.x += this.moveSpeed + 5;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.body.blocked.down) {
            this.jump();
        }
    }

    jump() {
        this.body.setVelocityY(-500); // Jumping velocity
    }
}
