//set up the config for the phaser scenes, which will be switched between by this constructor
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            //set physics to a phaser default of arcade
            default: 'arcade',
            arcade: {
                gravity: { y: 400 },
                debug: false
            }
        },
    //set up the order in which the scenes will be loaded
    scene: [gamemenu, level1, level2, level3, gameover]
    
};
//create the game
game = new Phaser.Game(config);

