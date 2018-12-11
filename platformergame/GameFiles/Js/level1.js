class level1 extends Phaser.Scene{
    constructor(){
        super({key:"level1"});
    }

    preload ()
    {
        this.load.image('background', 'sprites/background/background.png');
        this.load.image('grassBlock', 'sprites/Background/stageImg.png');
        this.load.image('dirtBlock', 'sprites/Background/stageImg2.png');
        this.load.image('stoneBlock', 'sprites/Background/stageImg3.png');
        this.load.image('door', 'sprites/Items/GameItems/doorSprite.png');
        this.load.image('speedPotion', 'sprites/items/gameitems/bluePot.png');
        this.load.image('healthPotion', 'sprites/items/gameitems/redPot.png');
        this.load.image('spikes', 'sprites/items/gameitems/spikesSprite.png');
        this.load.image('jumpPad','sprites/items/gameitems/jumpPad.png');
        this.load.spritesheet('crate', 'sprites/items/gameitems/crateSprite.png', {frameWidth: 22, frameHeight: 22});
        this.load.spritesheet('character', 'sprites/character/goodCharacter.png', { frameWidth: 24.16, frameHeight: 48 });
        this.load.spritesheet('bridge', 'sprites/background/bridgeSprite.png', {frameWidth: 64, frameHeight: 32});
        this.load.spritesheet('lever', 'sprites/items/gameitems/leverSprite.png', {frameWidth: 19, frameHeight: 23});
        this.load.spritesheet('enemy','sprites/character/enemySpriteSheet.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('laser', 'sprites/items/playeritems/laser.png');
    }
    create ()
    {
        

        this.playerHealth = 150;


        var door;
        var score = 0;
        this.add.image(400, 300, 'background');
        this.platforms = this.physics.add.staticGroup();
       
        //bridge
        this.bridges = this.physics.add.staticGroup();
        this.bridge1 = this.bridges.create(32, 160, 'bridge',0, true, 0);
        this.bridge1.setData('index', 0);
        this.bridge1.setData('frame', 0);
        this.bridge1.setFrame(1);
        //lever to control bridge
        this.levers = this.physics.add.staticGroup();
        this.lever1 = this.levers.create(368,112, 'lever',0, true, 0);
        this.lever1.setData('index', 0);
        this.lever1.setData('frame', 0);
        
    

        this.enemies = this.physics.add.group();
        this.enemy1 = this.enemies.create(200, 550, 'enemy', 0, true, 0);
        this.enemy1.setData('index', 0);
        this.enemy1.setData('frame', 0);
        this.enemy1.setData('boundLeft', (50));
        this.enemy1.setData('boundRight', (450));
        this.enemy1.setData('health', 100);
        this.enemy1.setVelocityX(100);

        //spikes for top lvl 
        this.spikes = this.physics.add.staticGroup();
      
        //create grass block for top of pits
        var x = 80;
        var y = 160;       
        for (var i = 0; i < 4; i++){
            this.platforms.create(x, y, 'grassBlock');
            x += 96;
        }
        //create dirt blocks for pits
        x = 80;
        y = 192;
        for(var j = 0;j < 4; j++){
            for (var i = 0; i < 2; i++){
                this.platforms.create(x, y, 'dirtBlock');
                y += 32;
            }
            y = 192;
            x += 96;
        }
        //creating spikes for pits
        x = 112;
        y = 224;
        for (var i = 0; i < 3; i++){
            this.spikes.create(x,y, 'spikes');
            this.spikes.create(x+32,y, 'spikes');
            x += 96;
        }
        //creating dirt wall at end of pits
        x = 400;
        y = 0;
        for (var i = 0; i < 8; i++){
            this.platforms.create(x, y, 'dirtBlock');
            y += 32;
        }
        //adding dirt blocks to bottom of pits
        x = 80;
        y = 256;
        for (var i = 0; i < 11; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        //Makng second layer of pits
        x = 10;
        y = 384;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'dirtBlock');
            this.platforms.create(x+32, y, 'dirtBlock');
            this.platforms.create(x+64, y, 'dirtBlock');
            x += 160;
        }
        //adding spikes to second pits
        x = 105;
        y = 384;
        for (var i = 0; i < 2; i++){
            this.spikes.create(x,y, 'spikes');
            this.spikes.create(x+32,y, 'spikes');
            x += 162;
        }
        //adding dirt blocks to bottom of pits
        x = 10;
        y = 416;
        for (var i = 0; i < 13; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        //adding more dirt blocks 
        x = 426;
        y = 384;
        for (var i = 0; i < 2; i++){
            this.platforms.create(x, y, 'dirtBlock');
            x += 32;
        }
        //adding jump pad to platform
        this.jumppads = this.physics.add.staticGroup();
        this.jumppads.create(442, 352, 'jumpPad');

        //adding platform for player to land on after jumppad
        x = 490;
        y = 160;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'stoneBlock');
            this.platforms.create(x+32, y, 'stoneBlock');
            x += 32;
            y -= 32;
        }
        //adding wall to lead up to platform
        x = 490;
        y = 192;
        for (var i = 0; i < 7; i++){
            this.platforms.create(x, y, 'stoneBlock');
            y += 32;
        }

        //adding create to platform
        this.lootCrates = this.physics.add.staticGroup();
        this.lootCrates.create(586, 64, 'crate',1);

        //making platform longer
        x = 618;
        y = 96;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'stoneBlock');
            x += 32;
        }
        //adding wall next to platform
        x = 778;
        y = 96;
        for (var i = 0; i < 10; i++){
            this.platforms.create(x, y, 'stoneBlock');
            this.platforms.create(x+32, y, 'stoneBlock');
            y += 32;
        }

        //adding inner platforms inside walls
        this.platforms.create(554, 160, 'stoneBlock');

        x = 746;
        y = 192;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'stoneBlock');
            x -= 32;
        }
        x = 586;
        y = 128;
        for (var i = 0; i < 9; i++){
            this.platforms.create(x, y, 'stoneBlock');
            y += 32;
        }
        x = 618;
        y = 288;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'stoneBlock');
            x += 32;
        }
        x = 746;
        y = 384;
        for (var i = 0; i < 3; i++){
            this.platforms.create(x, y, 'stoneBlock');
            x -= 32;
        }
        //adding create to inner walls
        this.lootCrates.create(522, 192, 'crate',1);

        //adding platform for below 
        x = 810;
        y = 512;
        for (var i = 0; i < 11; i++){
            this.platforms.create(x, y, 'stoneBlock');
            x -= 32;
        }
        //adding jump pad to get to create
        this.jumppads.create(538, 480, 'jumpPad');

        //adding bridge to block getting to create 
        this.bridge2 = this.bridges.create(538, 384, 'bridge',0, true, 0);
        this.bridge2.setData('index', 1);
        this.bridge2.setData('frame', 0);
        this.bridge2.setFrame(1);

        //adding lever to open bridge
        this.lever2 = this.levers.create(778,464, 'lever',0, true, 0);
        this.lever2.setData('index', 1);
        this.lever2.setData('frame', 0);

        //adding last platform for bottom of level
        x = 458;
        y = 600;
        for (var i = 0; i < 15; i++){
            this.platforms.create(x, y, 'stoneBlock');
            x -= 32;
        }
        x = 490;
        y = 544;
        for(var j = 0; j < 11; j++){
            for (var i = 0; i < 3; i++){
                this.platforms.create(x, y, 'stoneBlock');
                y += 32;
            }
            y = 544;
            x += 32;
        }
        
        //create exit door
        var door = this.physics.add.staticGroup();
        door.create(20, 540, 'door');
        //create groups of potions which dont have physics
        this.speedPotions = this.physics.add.staticGroup();
        this.healthPotions = this.physics.add.staticGroup();

        
        
        //create lasers group
        this.lasers = this.physics.add.group();
        //create player, set his animation frame, speed, bounce and fire status
        this.player = this.physics.add.sprite(100, 100, 'character');
        this.player.setData('frame', 0);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.speedLeft = -160;
        this.player.speedRight = 160;
        this.player.setData('recentlyFired', false);



        //allow keyboard input 
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.cursors = this.input.keyboard.createCursorKeys();

        //create text in top left for health
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

    }

    update ()
    {
        //if pressing left, set velocity left, play animation and set facing
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
            //if player is still but has moved right last, face right
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
            //by default, player faces right
            this.player.setVelocityX(0);

            this.player.anims.play('turnR');
            this.player.setData('frame', 1);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down){
            //if player is on ground and pressing up, make player jump
            this.player.setVelocityY(-200);
        }
        if (this.fKey.isDown){
            this.playerFire(this.player, this.lasers);
            this.player.setData('recentlyFired', true);
        }
        //get the objects inside of enemies group
        this.children = this.enemies.getChildren();

        for(var child = 0; child < this.children.length; child++){
            //if player is on same y plane, move towards player
            if ((this.player.y + 12) == this.children[child].y){
                var dx = this.player.x - this.children[child].x;
                if(dx < 0){
                    this.children[child].setVelocityX(-100);
                }
                else{
                    this.children[child].setVelocityX(100);
                }
                //jump enemy to random height
                var choice = Phaser.Math.Between(250, 350);
                this.children[child].setVelocityY(-choice);

            }
            else {
                //if reaches bound on left or right, change direction
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
        //fire based on direction, and dont allow firing if recently fired
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
            //create a laser and base direction on player frame
            var laser = lasers.create(player.x, player.y, 'laser');
            laser.body.allowGravity = false;

            if(frame == 0){
                laser.setVelocityX(-160);
                laser.y = laser.y - 10;
            }
            else if (frame == 1) {
                console.log("right");
                laser.setVelocityX(160);
                laser.y = laser.y - 10;
            }
        }
    }
    //enemy can take two hits
    enemyHit(laser, enemy) {
        laser.destroy();
        enemy.setFrame(1);
        enemy.setData('health', (enemy.getData('health') - 50));

        if(enemy.getData('health') == 0) {
            enemy.destroy();
        }


    }
    //when lever and bridge of same index activated via ekey, invert state
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
    //reduction of player health and transition to gameover
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
    //reduction of player health and transition to gameover
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
    //increase speed of player, reduce again after 10 seconds
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
    //increase player health
    healthPotion(player, healthPotion) {
        healthPotion.disableBody(true, true);

        this.playerHealth += 50;
        this.healthText.setText('Health: ' + this.playerHealth);


    }
    //random chance of item to be obtained
    brokenCrate(player, crate) {
        crate.setFrame(0);

        if(!crate.hasCollided) {
            crate.hasCollided = true;
            var choice = Phaser.Math.Between(1, 10);
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
    //increase player y velocity
    jumpPadTouched(player, jumpPad) {
        if (jumpPad.body.touching.up == true) {
            player.setVelocityY(-520);
        }
    }
    //transition to next level
    exitDoor(player, door){
        this.physics.destroy();
        this.scene.start('level2');
    }
}