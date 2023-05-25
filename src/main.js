// James Clark
// A Clockwork Orange


  /*
  Technically interesting aspect:
  One technically interesting aspect of this game is the implementation of power-ups, such as the double jump and fire breath abilities. The game allows the Dino character to utilize these abilities when they have the corresponding power-up, which adds an extra layer of depth and fun to the gameplay. The implementation of power-ups goes beyond the basic endless runner mechanics, showcasing creativity and a willingness to explore new features.

  In addition, the game's physics, like gravity and velocity management for the Dino character, showcase a solid understanding of Phaser's physics system. The game also makes use of sound effects, such as jump sfx, which adds an immersive experience for the players.

  Visual style:
  The game features a visually appealing Dino character with different textures to indicate the active power-ups, like wings for the double jump ability and fire breath animation. These visual cues are not only aesthetically pleasing but also serve as a clear indicator to the player about their current abilities. This attention to detail demonstrates the developer's commitment to creating a polished and engaging game experience.

  Furthermore, the game might incorporate a unique and visually stunning background, making the endless runner more enjoyable and visually appealing. The game could also feature a custom-designed soundtrack or sound effects that complement the visual style and create an immersive gaming experience.

  Overall, the game's technical aspects, such as power-ups and physics, and visual style, like the character design and textures, showcase the developer's creativity and willingness to experiment with the endless runner genre.
  */







let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    scene: [ Menu, Play ],

    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: true,
      },
    },
  }
  
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP;