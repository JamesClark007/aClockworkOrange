class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, groundY) {
      super(scene, x, y, texture);

      scene.add.existing(this);
      scene.physics.world.enableBody(this);
      this.body.setCollideWorldBounds(true);
      this.body.setGravityY(500);
      this.body.setSize(this.width * 0.3, this.height * 0.3);
      this.groundY = groundY;
      this.moveSpeed = 4;
      this.isJumping = false;
      this.jumpHeight = 200;
      this.jumpDuration = 500;
  }

  update() {
      if (keyLEFT.isDown && this.x >= borderUISize + this.width - 100) {
          this.x -= this.moveSpeed;
      }
      if (keyRIGHT.isDown && this.x <= game.config.width - 200) { 
          this.x += this.moveSpeed;
      }
      if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping) {
          this.jump();
      }
      if (this.y >= this.groundY) {
          this.y = this.groundY;
          this.body.velocity.y = 0;
          this.isJumping = false;
      }
  }

  jump() {
      this.isJumping = true;
      this.body.setVelocityY(-this.jumpHeight);
      this.scene.tweens.add({
          targets: this,
          y: this.groundY - this.jumpHeight,
          duration: this.jumpDuration / 2,
          ease: 'Quad.easeOut',
          onComplete: () => {
              this.scene.tweens.add({
                  targets: this,
                  y: this.groundY,
                  duration: this.jumpDuration / 2,
                  ease: 'Quad.easeIn',
                  onComplete: () => {
                      this.isJumping = false;
                  },
              });
          },
      });
  }
}
