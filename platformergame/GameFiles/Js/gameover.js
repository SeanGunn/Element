class gameover extends Phaser.Scene
{
    constructor(){
        super({key:"gameover"});
    }

    preload(){
        this.load.image('gameoverBackground', 'sprites/Background/gameOverScreen.png');
        this.load.image('startGame', 'sprites/Background/startGameButton.png');
        this.load.image('grassBlock', 'sprites/Background/stageImg.png');
        this.load.spritesheet('character', 'sprites/character/goodCharacter.png', { frameWidth: 24.16, frameHeight: 48 });
    }
    create() {

        this.add.image(400,300, 'gameoverBackground');
        //set default facing direction as neither right nor left
        this.right = false;
        this.left = false;
        //create platforms group and dont apply physics
        this.platforms = this.physics.add.staticGroup();
        //floor
        var x = 280;
        var y = 600;
        for (var i = 0; i < 9; i++){
            this.platforms.create(x, y, 'grassBlock');
            x += 32;
        }
        //start game button
        var start = this.physics.add.staticGroup();
        start.create(400, 500, 'startGame');

        //add player and define their interactions and speed
        this.player = this.physics.add.sprite(365, 550, 'character');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.speedLeft = -160;
        this.player.speedRight = 160;

        //accept cursor key input
        this.cursors = this.input.keyboard.createCursorKeys();
        //add collision between player and platforms
        this.physics.add.collider(this.player, this.platforms);
        //start the game again when player hits start
        this.physics.add.overlap(this.player, start, this.StartGame, null, this);
    }
update ()
    {
        //if pressing left, set velocity left, play animation and set facing
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(this.player.speedLeft);

            this.player.anims.play('left', true);
            this.left = true;
            this.right = false;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(this.player.speedRight);

            this.player.anims.play('right', true);
            this.right = true;
            this.left = false;

        }
        //if player is still but has moved right last, face right
        else if(this.right){
            this.player.setVelocityX(0);
            this.player.anims.play('turnR');
        }
        else if(this.left){
            this.player.setVelocityX(0);
            this.player.anims.play('turnL');
        }
        //by default, player faces right
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turnR');
        }
        //if player is on ground and pressing up, make player jump
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-200);
        }
    }
    //when player collides with start game button, start level 1
    StartGame(player, start){
        this.scene.start('level1');
    }
}
