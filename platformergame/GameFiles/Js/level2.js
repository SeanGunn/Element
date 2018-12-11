class level2 extends Phaser.Scene{
    constructor(){
        super({key:"level2"});
    }

    //  FOR FULL COMMENTS SEE LEVEL 1

    preload ()
    {
        this.load.image('background', 'sprites/background/2ndLvlBackground.png');
        this.load.image('brickBlock', 'sprites/Background/2ndLvlStageImg.png');
        this.load.image('dirtBlock', 'sprites/Background/2ndLvlStageImg2.png');
        this.load.image('door', 'sprites/Items/GameItems/2ndLvlDoorSprite.png');
        this.load.image('speedPotion', 'sprites/items/gameitems/bluePot.png');
        this.load.image('healthPotion', 'sprites/items/gameitems/redPot.png');
        this.load.image('spikes', 'sprites/items/gameitems/2ndLvlSpikesSprite.png');
        this.load.image('jumpPad','sprites/items/gameitems/jumpPad.png');
        this.load.spritesheet('crate', 'sprites/items/gameitems/2ndLvlCrateSprite.png', {frameWidth: 22, frameHeight: 22});
        this.load.spritesheet('character', 'sprites/character/goodCharacter.png', { frameWidth: 24.16, frameHeight: 48 });
        this.load.spritesheet('bridge', 'sprites/background/BridgeSprite.png', {frameWidth: 64, frameHeight: 32});
        this.load.spritesheet('lever', 'sprites/items/gameitems/2ndLvlLeverSprite.png', {frameWidth: 19, frameHeight: 23});
        this.load.spritesheet('enemy','sprites/character/enemySpriteSheet.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('laser', 'sprites/items/playeritems/laser.png');
    }
    create ()
    {

        this.playerHealth = 150;

        this.add.image(400, 300, 'background');
        this.platforms = this.physics.add.staticGroup();
        var y = 600;
        var x = 0;
        //ground level
        for (var i = 0; i < 26; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        y = 456;
        x = 0;
        //first level
        for (var i = 0; i < 15; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        this.bridges = this.physics.add.staticGroup();
        this.bridge1 = this.bridges.create(495, 456, 'bridge',0, true, 0);
        this.bridge1.setData('index', 0);
        this.bridge1.setData('frame', 0);
        this.bridge1.setFrame(1);
        
        this.levers = this.physics.add.staticGroup();
        this.lever1 = this.levers.create(300, 550, 'lever',0, true, 0);
        this.lever1.setData('index', 0);
        this.lever1.setData('frame', 0);

        this.jumppads = this.physics.add.staticGroup();
        this.jumppads.create(495,575, 'jumpPad');

        x = 544;
        for (var i = 0; i < 15; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        
        this.enemies = this.physics.add.group();
        this.enemy1 = this.enemies.create(200, 550, 'enemy', 0, true, 0);
        this.enemy1.setData('index', 0);
        this.enemy1.setData('frame', 0);
        this.enemy1.setData('boundLeft', (50));
        this.enemy1.setData('boundRight', (750));
        this.enemy1.setData('health', 100);
        this.enemy1.setVelocityX(100);

        y = 312;
        x = 0;
        //second level
        for (var i = 0; i < 10; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        this.bridge2 = this.bridges.create(336, 312, 'bridge',0, true, 1);
        this.bridge2.setData('index', 1);
        this.bridge2.setData('frame', 0);
        this.bridge2.setFrame(1);

        this.lever2 = this.levers.create(700, 416, 'lever',0, true, 1);
        this.lever2.setData('index', 1);
        this.lever2.setData('frame', 0);

        this.jumppads.create(336,432, 'jumpPad');
        x = 385;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        this.enemy2 = this.enemies.create(200, 400, 'enemy', 0, true, 1);
        this.enemy2.setData('index', 1);
        this.enemy2.setData('frame', 0);
        this.enemy2.setData('boundLeft', (50));
        this.enemy2.setData('boundRight', (450));
        this.enemy2.setData('health', 100);
        this.enemy2.setVelocityX(100);

        this.spikes = this.physics.add.staticGroup();
        x = 482;
        y = 312; 
        for (var i = 0; i < 3; i++){
            this.spikes.create(x, y, 'spikes');
            x += 32;
        }
       
        x = 578;
        for (var i = 0; i < 9; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }

        x = 0;
        y = 168;
        for (var i = 0; i < 6; i++){
            this.platforms.create(x, y, 'brickBlock');
            x += 32;
        }
        this.bridge3 = this.bridges.create(208, 168, 'bridge',0, true, 2);
        this.bridge3.setData('index', 2);
        this.bridge3.setData('frame', 0);
        this.bridge3.setFrame(1);

        this.lever3 = this.levers.create(600, 250, 'lever',0, true, 2);
        this.lever3.setData('index', 2);
        this.lever3.setData('frame', 0);

        this.enemy3 = this.enemies.create(200, 200, 'enemy', 0, true, 2);
        this.enemy3.setData('index', 2);
        this.enemy3.setData('frame', 0);
        this.enemy3.setData('boundLeft', (50));
        this.enemy3.setData('boundRight', (300));
        this.enemy3.setData('health', 100);
        this.enemy3.setVelocityX(100);
        x = 255;
        for (var i = 0; i < 6; i++){
            this.platforms.create(x, y, 'brickBlock');
            x += 32;
        }
        x = 445;
        y = 168;
        for(var i = 0; i < 4; i++){
            this.spikes.create(x, y, 'spikes');
            x += 32
        }

        x = 573;
        for (var i = 0; i < 9; i++){
            this.platforms.create(x, y, 'brickBlock');
            x += 32;
        }

        this.jumppads.create(205,290, 'jumpPad');
        var door = this.physics.add.staticGroup();
        door.create(780, 110, 'door');

        this.speedPotions = this.physics.add.staticGroup();
        this.healthPotions = this.physics.add.staticGroup();

        this.lootCrates = this.physics.add.staticGroup();
        this.lootCrates.create(160, 260, 'crate',1);

        this.lasers = this.physics.add.group();
        this.player = this.physics.add.sprite(730, 500, 'character');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.speedLeft = -160;
        this.player.speedRight = 160;
        this.player.setData('recentlyFired', false);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.healthText = this.add.text(16, 16, 'health: 150', { fontSize: '32px', fill: '#000' });

        //Physics effects - level
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.bridges);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.bridges);
        //Player colliders
        this.physics.add.overlap(this.player, this.speedPotions, this.speedPotion, null, this);
        this.physics.add.overlap(this.player, this.healthPotions, this.healthPotion, null, this);
        this.physics.add.overlap(this.player, this.lootCrates, this.brokenCrate, null, this);
        this.physics.add.overlap(this.player, this.levers, this.toggleLever, null, this);
        this.physics.add.overlap(this.player, door, this.exitDoor, null, this);
        this.physics.add.overlap(this.lasers, this.enemies, this.enemyHit, null, this);
        //Physics effects - colliders
        this.physics.add.collider(this.player, this.spikes, this.spikesHit, null, this);
        this.physics.add.collider(this.player, this.enemies, this.enemyHitPlayer, null, this);
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
            this.player.setData('frame', 0);
            this.left = true;
            this.right = false;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(this.player.speedRight);
            this.player.anims.play('right', true);
            this.player.setData('frame', 1);
            this.right = true;
            this.left = false;

        }
        else if(this.right){
            this.player.setVelocityX(0);
            this.player.anims.play('turnR');
            this.player.setData('frame', 1);
        }
        else if(this.left){
            this.player.setVelocityX(0);
            this.player.anims.play('turnL');
            this.player.setData('frame', 0);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turnR');
            this.player.setData('frame', 1);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-200);
        }
        if (this.fKey.isDown){
            this.playerFire(this.player, this.lasers);
            this.player.setData('recentlyFired', true);
        }

        this.children = this.enemies.getChildren();

        for(var child = 0; child < this.children.length; child++){
            //console.log(this.children[child].x);
            if ((this.player.y + 12) == this.children[child].y){
                var dx = this.player.x - this.children[child].x;
                if(dx < 0){
                    this.children[child].setVelocityX(-100);
                }
                else{
                    this.children[child].setVelocityX(100);
                }

                var choice = Phaser.Math.Between(250, 350);
                this.children[child].setVelocityY(-choice);

            }
            else {

                if(this.children[child].x <= this.children[child].getData('boundLeft')){
                    this.children[child].setVelocityX(100);
                }

                else {
                    if(this.children[child].x >= this.children[child].getData('boundRight')){
                        this.children[child].setVelocityX(-100);
                    } 
                } 
                
            }
            
        }
    }

    playerFire(player, lasers){
        console.log("fire");
        var frame = player.getData('frame');
        var recentlyFired = player.getData('recentlyFired')

        if(recentlyFired == false) {
            fire();

            function resetFire() {
                player.setData('recentlyFired', false);
            }

            setTimeout(resetFire, 500);

        }
        function fire(){
            var laser = lasers.create(player.x, player.y, 'laser');
            laser.body.allowGravity = false;

            if(frame == 0){
                laser.setVelocityX(-160);
                laser.y = laser.y - 10;
            }
            else if (frame == 1) {
                laser.setVelocityX(160);
                laser.y = laser.y - 10;
            }
        }
    }

    enemyHit(laser, enemy) {
        laser.destroy();
        enemy.setFrame(1);
        enemy.setData('health', (enemy.getData('health') - 50));

        if(enemy.getData('health') == 0) {
            enemy.destroy();
        }


    }
    enemyHitPlayer(player, enemy){
        this.playerHealth -= 50;
        this.healthText.setText('Health: ' + this.playerHealth);
        if(this.playerHealth < 49) {
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.physics.destroy();
            this.scene.start('gameover');
        }
    }

    speedPotion(player, speedPotion) {
        speedPotion.disableBody(true, true);

        player.speedLeft = player.speedLeft - 80;
        player.speedRight = player.speedRight + 80;

        
        function decreaseSpeed() {
            player.speedLeft = player.speedLeft + 80;
            player.speedRight = player.speedRight - 80;
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
            player.setVelocityY(-350);
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

    exitDoor(player, door){
        this.physics.destroy();
        this.scene.start('level3');
    }

    spikesHit(player, spike)
    {
        this.playerHealth -= 50;
        this.healthText.setText('Health: ' + this.playerHealth);

        if(this.playerHealth > 49) {
            player.setVelocityY(-200);
        }
        else {
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.physics.destroy();
            this.scene.start('gameover');
        }
            
    }
}