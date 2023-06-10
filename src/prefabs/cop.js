class Cop extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, patrolArea) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(this.width * 0.3, this.height * 0.3);
        this.patrolArea = patrolArea;
        this.alerted = false;
        this.flashlightRotation = 0; 

        // create cop sprite
        this.copSprite = scene.add.sprite(0, 0, texture);
        this.copSprite.setOrigin(0.5, 1);
        this.add(this.copSprite);

        this.facingRight = false; // Track the direction the cop is facing
        this.previousX = x; // Track the previous x position


        const groundY = game.config.height - borderUISize - borderPadding;


        
        this.light = scene.add.image(-19, -46, 'light'); // relative position to the container
        this.light.setOrigin(0.55, 0.5);
        this.add(this.light); // add light to container



        // start patrol
        this.startPatrol();


    }

    startPatrol() {

        const groundY = game.config.height - borderUISize - borderPadding;

        this.scene.tweens.add({
            targets: this,
            props: {
                x: { value: {from: this.patrolArea.start, to: this.patrolArea.end}, duration: Phaser.Math.Between(5000, 10000) },
                y: { value: {from: groundY + 30, to: groundY - 30}, duration: Phaser.Math.Between(2000, 4000), yoyo: true, repeat: -1 }
            },
            yoyo: true,
            repeat: -1
        });
    }
    
    rotateLight() {
        this.flashlightRotation += 0.02; 
        this.light.angle = Math.sin(this.flashlightRotation) * 10;
    }
    

    update(player) {
        // If player is too close, alert!
        if (Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y) < 100) {
            this.alerted = true;
        }   


        if (this.x > this.previousX) {
            this.facingRight = false;
            this.light.x = 20;
          } 
        else if (this.x < this.previousX) {
            this.facingRight = true;
            this.light.x = -20;
        }
      

        this.copSprite.setScale(this.facingRight ? 1 : -1, 1);
        this.light.setScale(this.facingRight ? 1 : -1, 1);
      
        this.previousX = this.x; // Update the previous x position
      
       
       

        this.rotateLight();
    }
}
