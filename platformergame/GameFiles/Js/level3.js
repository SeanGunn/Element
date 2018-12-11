class level3 extends Phaser.Scene{
    constructor(){
        super({key:"level3"});
    }

    //  FOR FULL COMMENTS SEE LEVEL 1


    preload ()
    {
        this.load.image('background', 'sprites/background/3rdLvlBackground.png');
        this.load.image('snowBlock', 'sprites/Background/3rdLvlStageImg.png');
        this.load.image('iceBlock', 'sprites/Background/3rdLvlStageImg2.png');
        this.load.image('door', 'sprites/Items/GameItems/3rdLvlDoorSprite.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('speedPotion', 'sprites/items/gameitems/bluePot.png');
        this.load.image('healthPotion', 'sprites/items/gameitems/redPot.png');
        this.load.image('spikes', 'sprites/items/gameitems/3rdLvlSpikesSprite.png');
        this.load.image('jumpPad','sprites/items/gameitems/jumpPad.png');
        this.load.spritesheet('crate', 'sprites/items/gameitems/crateSprite.png', {frameWidth: 22, frameHeight: 22});
        this.load.spritesheet('character', 'sprites/character/goodCharacter.png', { frameWidth: 24.16, frameHeight: 48 });
        this.load.spritesheet('bridge', 'sprites/background/bridgeSprite.png', {frameWidth: 64, frameHeight: 32});
        this.load.spritesheet('lever', 'sprites/items/gameitems/3rdLvlLeverSprite.png', {frameWidth: 19, frameHeight: 23});
    }
    create ()
    {

        this.playerHealth = 150;

        this.add.image(400, 300, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.levers = this.physics.add.staticGroup();
        this.bridges = this.physics.add.staticGroup();
        this.jumppads = this.physics.add.staticGroup();
        this.crates = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        this.lootCrates = this.physics.add.staticGroup();
        

        //adding bottom platform 
        var x = 0;
        var y = 600;
        for(var i = 0; i < 26; i++){
            this.platforms.create(x,y,'iceBlock')
            x += 32;
        }
        //adding ice pillers and snow blocks for tops
        x = 128;
        y = 600;
        for(var i = 0; i < 8; i++){
            if(i == 7){
                this.platforms.create(x,y,'snowBlock');
            }
            else{
                this.platforms.create(x,y,'iceBlock');
            }
            y -= 32;
        }
        x = 224;
        y = 600;
        for(var i = 0; i < 9; i++){
            if(i == 8){
                this.platforms.create(x,y,'snowBlock');
            }
            else{
                this.platforms.create(x,y,'iceBlock');
            }
            y -= 32;
        }
        x = 320;
        y = 600;
        for(var i = 0; i < 10; i++){
            if(i == 9){
                this.platforms.create(x,y,'snowBlock');
            }
            else{
                this.platforms.create(x,y,'iceBlock');
            }
            y -= 32;
        }
        x = 416;
        y = 600;
        for(var i = 0; i < 17; i++){
            this.platforms.create(x,y,'iceBlock');
            y -= 32;
        }
        //adding jumppad to get onto pillers
        this.jumppads.create(96,568, 'jumpPad');
        //adding spikes inbetween pillers
        x = 160;
        y = 568;
        for(var i = 0;i < 3;i++){
            this.spikes.create(x, y, 'spikes');
            this.spikes.create(x+32,y,'spikes');
            x += 96;
        } 

        //adding jumppad on piller
        this.jumppads.create(320,280, 'jumpPad');
        //adding bridge above jumppad
        this.bridge1 = this.bridges.create(320, 88, 'bridge',0, true, 0);
        this.bridge1.setData('index', 0);
        this.bridge1.setData('frame', 0);
        this.bridge1.setFrame(1);
        //adding lever to open bridge
        this.lever1 = this.levers.create(32, 280, 'lever',0, true, 0);
        this.lever1.setData('index', 0);
        this.lever1.setData('frame', 0);
        //adding platform for lever
        this.platforms.create(32,312,'snowBlock');
        this.platforms.create(0,312,'snowBlock');
        //adding crate
        this.lootCrates.create(32, 32, 'crate',1);
        //adding more platform blocks
        x = 271;
        y = 88;
        for(var i = 0;i < 10;i++){
            this.platforms.create(x,y,'snowBlock');
            x -= 32
        }
        x = 367;
        for(var i = 0;i < 11;i++){
            this.platforms.create(x,y,'snowBlock');
            x += 32
        }

        //creating wall and more platforms 
        x = 687;
        y = 120;
        for(var i = 0;i < 13;i++){
            this.platforms.create(x,y,'iceBlock');
            y += 32
        }
        
        x = 445;
        y = 318;
        for(var i = 0;i < 4;i++){
            this.platforms.create(x,y,'iceBlock');
            x += 32
        }

        //making jumppads to get to door
        this.jumppads.create(623,568, 'jumpPad');
        this.jumppads.create(455,288, 'jumpPad');

        this.door = this.physics.add.staticGroup();
        this.door.create(455, 152, 'door');

        this.speedPotions = this.physics.add.staticGroup();
        this.healthPotions = this.physics.add.staticGroup();

        

       

        this.player = this.physics.add.sprite(20, 500, 'character');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.speedLeft = -160;
        this.player.speedRight = 160;

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'character', frame: 3 } ], 
            frameRate: 10
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.healthText = this.add.text(16, 16, 'Health: 150', { fontSize: '32px', fill: '#000' });

        //Physics effects - level
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.bridges);
        //Player colliders
        this.physics.add.overlap(this.player, this.speedPotions, this.speedPotion, null, this);
        this.physics.add.overlap(this.player, this.healthPotions, this.healthPotion, null, this);
        this.physics.add.overlap(this.player, this.lootCrates, this.brokenCrate, null, this);
        this.physics.add.overlap(this.player, this.levers, this.toggleLever, null, this);
        this.physics.add.overlap(this.player, this.door, this.exitDoor, null, this);
        //Physics effects - colliders
        this.physics.add.collider(this.player, this.spikes, this.spikesHit, null, this);
        this.spikes.checkCollision = {left: false, right: false, down: false, up: true};
        this.physics.add.collider(this.player, this.jumppads, this.jumpPadTouched, null, this);
        this.jumppads.checkCollision = {left: false, right: false, down: false, up: true}; //So only activates on top of jump pad
        // this.keys = {
        //     jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        //     left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        //     right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        // };
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(this.player.speedLeft);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(this.player.speedRight);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-200);
        }
    }

    speedPotion(player, speedPotion) {
        speedPotion.disableBody(true, true);

        this.player.speedLeft = this.player.speedLeft - 80;
        this.player.speedRight = this.player.speedRight + 80;

        
        function decreaseSpeed() {
            this.player.speedLeft = this.player.speedLeft + 80;
            this.player.speedRight = this.player.speedRight - 80;
        }

        setTimeout(decreaseSpeed, 10000);

    }

    healthPotion(player, healthPotion) {
        healthPotion.disableBody(true, true);

        this.playerHealth += 50;
        this.healthText.setText('Health: ' + this.playerHealth);


    }

    brokenCrate(player, crate) {
        crate.setFrame(0);

        if(!crate.hasCollided) {
            crate.hasCollided = true;
            var choice = Phaser.Math.Between(1, 10);
        
            console.log(choice);
            switch(true) {
                case (choice <= 3): 
                    this.speedPotions.create((crate.x + 40), crate.y, 'speedPotion');
                    break;

                case (choice <= 6):
                    this.healthPotions.create((crate.x + 40), crate.y, 'healthPotion');
                    break;
            }
        }
    }

    jumpPadTouched(player, jumpPad) {
        if (jumpPad.body.touching.up == true) {
            player.setVelocityY(-520);
        }
    }

    toggleLever(player, lever) {
        var index = lever.getData('index');
        var frame = lever.getData('frame');
        var bridge = this.bridges.getChildren()[index];

        if (this.eKey._justDown && frame == 1) {
            bridge.setFrame(1);
            bridge.enableBody(false);
            lever.setFrame(0);
            lever.setData('frame', 0);
        }

        else if (this.eKey._justDown && frame == 0) {
            this.bridges.getChildren()[index].setFrame(0);
            bridge.disableBody(true);
            lever.setFrame(1);
            lever.setData('frame', 1);
        }

        this.eKey._justDown = false;
    }

    exitDoor(player, door, score){
        this.score += 50;
        this.scene.start('gameover');
    }

    spikesHit(player, spike)
    {
        this.playerHealth -= 50;
        this.healthText.setText('Health: ' + this.playerHealth);

        if(this.playerHealth > 49) {
            player.setVelocityY(-390);
        }
        
        else {
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.physics.destroy();
            this.scene.start('gameover');
        }
            
    }
}