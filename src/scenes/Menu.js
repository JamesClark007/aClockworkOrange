let highScore = 0; // Global variable to hold high score


class Menu extends Phaser.Scene {
      constructor() {
        super("menuScene");
      }

      preload() {
        
          this.load.image('menuBackground', './assets/spooky_background.png');
        }
      
      create() {
        
        let highScoreText;
        highScoreText = this.add.text(game.config.width / 2, game.config.height / 4, 'High Score: ' + highScore, { fontFamily: 'Arial', fontSize: '32px', backgroundColor: '#F3B141', color: '#FFFFFF', align: 'center'}).setOrigin(0.5);




        // will use this later for the menu screen
        this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);


          let menuConfig = {
              fontFamily: 'Arial',
              fontSize: '32px',
              backgroundColor: '#F3B141',
              color: '#FFFFFF',
              align: 'center',
              padding: {
                  top: 5,
                  bottom: 5,
              },
              fixedWidth: 0
          }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize
        - borderPadding, 'A Clockwork Orange', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '28px';
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use <- -> and UP arrows to move', menuConfig).setOrigin(0.5);
          
        // define keys
          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      }

      update() {
          if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              //spaceshipSpeed: 3,
              gameTimer: 60 // Change this value to set the game duration (e.g., 120000 for 2 minutes)
            }
            
            
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              //spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            
            this.scene.start('playScene');    
          }
        }
        


    }
    