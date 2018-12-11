class gamemenu extends Phaser.Scene
{
    constructor(){
        super({key:"gamemenu"});
    }
    preload(){
        //loads all required assets for scene in hefore they are used
        this.load.image('menuBackground', 'sprites/background/startGameScreen800x600.png');
    	this.load.image('decreaseMusicButton', 'Sprites/images/decreaseVButton.png');
    	this.load.image('increaseMusicButton', 'Sprites/images/increaseVButton.png');
    	this.load.image('muteMusicButton', 'Sprites/images/muteButton.png');
        this.load.audio('music', 'assets/audio/251461__joshuaempyre__arcade-music-loop.wav');
        this.load.image('startGame', 'sprites/Background/startGameButton.png');
        this.load.image('grassBlock', 'sprites/Background/stageImg.png');
        //spritesheet is loaded, with the frame for transitions referenced
        this.load.spritesheet('character', 'sprites/character/goodCharacter.png', { frameWidth: 24.16, frameHeight: 48 });
        //loading bar added as a graphics object, running a function to fill as the assets are loaded
        var progress = this.add.graphics();

        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xEEEEEE, 0.8);
            progress.fillRect(100, 280, 600 * value, 40);

        });
        //delete loading bar after loading complete
        this.load.on('complete', function () {
            progress.destroy();
        });
    }
    create() {
        this.add.image(400, 300, 'menuBackground');
        //setting up music
        this.sound.add('music', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0
        }).play();

        //add music to the sound manager for phaser
        this.music = this.sound.add('music');
        this.music.mute = false;
        this.music.volume = 0.3;
        this.music.play({
            rate: 1,
            detune: 0
        });

        this.sound.mute = false;
        //buttons for music
        this.lowerVolumeButton = this.add.sprite(750, 20, 'decreaseMusicButton').setInteractive();
        this.increaseVolumeButton = this.add.sprite(700, 20, 'increaseMusicButton').setInteractive();
        this.muteVolumeButton = this.add.sprite(650, 20, 'muteMusicButton').setInteractive();
        //loop song continuously
        this.loopMarker = {
	        name: 'loop',
	        start: 0,
	        duration: 34.28,
	        config: {
	            loop: true
	        }
	    };
        //add the loop instruction to the song
    	this.music.addMarker(this.loopMarker);
        //only loop at end of song
    	this.music.play('loop', {
        	delay: this.loopMarker.duration
    	});

        //lower music volume on button press
        this.volume = this.sound.volume;
	    this.lowerVolumeButton.on('pointerdown', function (pointer) {
            //change colour of button
	        this.lowerVolumeButton.setTint(0xff0000);
            //if volume isnt at 0, volume decreases
            if(this.volume >= 0.1){
                this.volume -= 0.1;
            }
            this.sound.volume = this.volume;
	    }, this);

        //on button release, restore original colour of button
	    this.lowerVolumeButton.on('pointerout', function (pointer) {

	        this.clearTint();

	    });

	    this.lowerVolumeButton.on('pointerup', function (pointer) {

	        this.clearTint();

	    });

	    //increase music volume on button press
	   	this.increaseVolumeButton.on('pointerdown', function (pointer) {
            //change colour of button
	        this.increaseVolumeButton.setTint(0xff0000);
            //if volume isnt at 1, volume increases
            if(this.volume <= 0.9){
                this.volume += 0.1;
            }
            this.sound.volume = this.volume;


	    }, this);
        //on button release, restore original colour of button
	    this.increaseVolumeButton.on('pointerout', function (pointer) {

	        this.clearTint();

	    });

	    this.increaseVolumeButton.on('pointerup', function (pointer) {
	        this.increaseVolumeButton.clearTint();
	    }, this);	  

        //mute music  
        this.toggle = false;
	    this.muteVolumeButton.on('pointerdown', function (pointer) {
            //change colour of button
            this.muteVolumeButton.setTint(0xff0000);
            //check if already muted
            if(this.toggle == false){
                this.sound.pauseAll();
                this.toggle = true;
            }
            else{
                this.sound.resumeAll();
                this.toggle = false;
            }

	    }, this);
        //on button release, restore original colour of button
	    this.muteVolumeButton.on('pointerout', function (pointer) {
	        this.clearTint();

	    });

	    this.muteVolumeButton.on('pointerup', function (pointer) {
	        this.clearTint();

	    });

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
        //if no animations are already created, create them
        if(this.anims.get('left') == null){
            //left animation consists of the 4th and 5th frames on player spritesheet alternating
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('character', { start: 4, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
            //set facing
            this.anims.create({
                key: 'turnR',
                frames: [ { key: 'character', frame: 2 } ], 
                frameRate: 10
            });

            this.anims.create({
                key: 'turnL',
                frames: [ { key: 'character', frame: 3 } ], 
                frameRate: 10
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('character', { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1
            });
        }
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