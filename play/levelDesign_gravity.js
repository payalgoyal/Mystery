var playerStop = 0;
var rightMove = 1;
var leftMove = 1;
var rightJump = 1;
var blocked = 0;
var jumpRight = "false";
var jumpLeft = "false";
var collision = 0;
var pos = "down";
var rockCol = 0;
var playerBaseLevel = "ground";
var index = -1;
var nextElementRock = "test";
var steps1Index = -1;
var steps2Index = -1;
var stepsColIndex = -1;
var stepsInd = -1;
var tubeIndex = -1;
var obstructs = [];
check = 0;
var groundAvail = 1;
var myspriteState = "stand";
var enemyKilled = 0;

var playerProperties = {
  velocity: 300,
}; 

var levelDesign1 = function(game){}
// Creates a new 'main' state that will contain the game
	levelDesign1.prototype = {
		preload: function() { 
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("cloud", "images/layer-6_small.png");
			game.load.image("sky", "images/layer-1_small.png");
			// game.load.image("building", "images/layer-2_small.png");
			
			game.load.image("grass", "images/grass.png");
			game.load.image("ground", "images/ground4.jpg");
			
			game.load.image("lowerSteps", "images/lower_steps.png");
			game.load.image("steps2", "images/steps2.png");
			game.load.image("steps3", "images/steps3.png");
			
			game.load.image("wall", "images/wall.png");
			game.load.image("rock", "images/rock.jpg");
			
			game.load.image("tube", "images/tubeTank.png");
			
			game.load.image("villian", "images/enemy.png");
			game.load.image("playerRight", "images/mario_jumpRight.jpg");
			game.load.image("playerStand", "images/mario_stand.jpg");
			
			game.load.image("rightArrow", "images/rightArrow.png");
			game.load.image("leftArrow", "images/leftArrow.png");
			game.load.image("upArrow", "images/upArrow.png");
			
			game.load.image("underground", "images/underground.png");
			
			game.load.spritesheet("enemiesSprite", "images/enemiesSpritesheet.png");
			
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			
			game.load.spritesheet("rightSprite", "images/dude.png",32,48);
		},
		create: function() { 
			game.world.setBounds(0,0,14000,0);
			// sky = game.add.tileSprite(0, 0,10000,350, 'sky');
			// sky.width = 3500;
			// sky.height = game.height/1.5;
			cloud = game.add.tileSprite(0, 0,10000,500, 'cloud');
			// underground = game.add.tileSprite(0, 350,10000,50, 'underground');
			
			// cloud = game.add.sprite(900, 0, 'cloud');
			// building = game.add.sprite(0,-200,'building');
			
			ground = game.add.tileSprite(0, game.height/1.5,10000,40, 'ground');
			// ground.width = 1800;
			// ground_dup = game.add.sprite(1200, 300, 'ground');
			// ground_dup.width = 1500;
			grass = game.add.tileSprite(0, game.height/1.55, 10000, 15, "grass");
			
			// grass1 = game.add.sprite(300,290,'grass');
			// grass2 = game.add.sprite(600,290,'grass');
			// grass3 = game.add.sprite(900,290,'grass');
			// grass4 = game.add.sprite(1200,290,'grass');
			// grass5 = game.add.sprite(1500,290,'grass');
			
			steps1 = game.add.group();
			steps1.enableBody = true;
			steps1.createMultiple(2,'lowerSteps');
			
			steps1.children[0].reset(2240,game.height/1.55);
			steps1.children[1].reset(4500,game.height/1.55);
			
			steps2 = game.add.group();
			steps2.enableBody = true;
			steps2.createMultiple(2,'steps2');
			
			steps2.children[0].reset(2270,game.height/1.64);
			steps2.children[1].reset(4530,game.height/1.64);
			
			rock = game.add.group();
			rock.enableBody = true;
			rock.createMultiple(14, 'rock');
			
			for (var i =0;i<14;i++){
				rock.children[i].body.velocity.y = 0;
				rock.children[i].body.gravity = 0;
			}
			
			rock.children[0].reset(856, game.height/2.65);
			rock.children[0].edgeLeft = true;
			rock.children[1].reset(896, game.height/2.65);
			rock.children[2].reset(936, game.height/2.65);
			rock.children[2].edgeRight = true;
			
			rock.children[3].reset(1720, game.height/6);
			
			rock.children[4].reset(1760, game.height/2.65);
			rock.children[5].reset(1800, game.height/2.65);
			rock.children[6].reset(1840, game.height/2.65);
			rock.children[6].edge = "right";
			
			rock.children[7].reset(1800, game.height/6);
			rock.children[8].reset(1840, game.height/6);
			
			rock.children[9].reset(2520, game.height/2.65);
			rock.children[9].edge = "left";
			rock.children[10].reset(2560, game.height/2.65);
			rock.children[10].reset(2600, game.height/2.65);
			
			rock.children[11].reset(3660, game.height/2.65);
			rock.children[12].reset(3700, game.height/2.65);
			rock.children[13].reset(3740, game.height/2.65);
			
			tubes = game.add.group();
			tubes.enableBody = true;
			tubes.createMultiple(3,'tube');
			
			tubes.children[0].reset(1130,game.height/1.9);
			tubes.children[1].reset(3230,game.height/1.9);
			tubes.children[2].reset(4130,game.height/1.9);
			
			enemies = game.add.group();
			enemies.enableBody = true;
			enemies.createMultiple(4,'villian');
			
			enemies.children[0].reset(480,game.height/1.65);
			enemies.children[0].vel = 100;
			
			enemies.children[1].reset(960,game.height/1.65);
			enemies.children[1].vel = 200;
			
			enemies.children[2].reset(1260,game.height/1.65);
			enemies.children[2].vel = 200;
			
			enemies.children[3].reset(2960,game.height/1.65);
			enemies.children[3].vel = 200;
			
			obstructs.push(tubes);
			obstructs.push(rock);
			obstructs.push(steps1);
			
			rightButton = game.add.button(game.camera.view.width/3,game.camera.view.height-50,'rightArrow');
			rightButton.fixedToCamera = true;
			leftButton = game.add.button(game.camera.view.width/3.5,game.camera.view.height-50,'leftArrow');
			leftButton.fixedToCamera = true;
			upButton = game.add.button(game.camera.view.width/3.2,game.camera.view.height-90,'upArrow');
			upButton.fixedToCamera = true;
			
			rightButton.pressed = "false";
			
			leftButton.pressed = "false";
			upButton.pressed = "false";
			
			mysprite=game.add.sprite(game.width/6,game.height/1.75,'rightSprite');
			mysprite.frame=4;
			
			coins = game.add.group();
			coins.enableBody = true;
			coins.createMultiple(14,'coinsSprite');
			
			coins.children[0].reset(850,100);
			coins.children[0].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[1].reset(890,100);
			coins.children[1].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[2].reset(930,100);
			coins.children[2].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[3].reset(1360,100);
			coins.children[3].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[4].reset(1400,100);
			coins.children[4].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[5].reset(1440,100);
			coins.children[5].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[6].reset(1480,100);
			coins.children[6].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[7].reset(1320,150);
			coins.children[7].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[8].reset(1360,150);
			coins.children[8].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[9].reset(1400,150);
			coins.children[9].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[10].reset(1440,150);
			coins.children[10].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[11].reset(1480,150);
			coins.children[11].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[12].reset(1520,150);
			coins.children[12].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[13].reset(1560,150);
			coins.children[13].animations.add('spin',[0,1,2,3],10,true);
			
			mysprite.animations.add('left',[0,1,2,3],4,true);
			mysprite.animations.add('right',[5,6,7,8],4,true);
			
			game.physics.enable(grass, Phaser.Physics.ARCADE);
			game.physics.enable(enemies, Phaser.Physics.ARCADE);
			game.physics.enable(ground, Phaser.Physics.ARCADE);
			game.physics.enable(rock, Phaser.Physics.ARCADE);
			game.physics.enable(steps1, Phaser.Physics.ARCADE);
			game.physics.enable(steps2, Phaser.Physics.ARCADE);
			game.physics.enable(tubes, Phaser.Physics.ARCADE);
			
			game.physics.enable(mysprite, Phaser.Physics.ARCADE);
			// game.camera.target = mysprite;
			cursors = game.input.keyboard.createCursorKeys();
			game.camera.follow(mysprite);
		},
		update: function() { 
			
			// mysprite.animations.play('right');
			if (rightButton.pressed == "true" && upButton.pressed == "true" && leftButton.pressed == "false"){
				jumpPlayerRight();
			}
			
			if (rightButton.pressed == "false" && upButton.pressed == "true" && leftButton.pressed == "true"){
				jumpPlayerLeft();
			}
			
			if(playerBaseLevel == "rock"){
				if (move == "right"){
					checkRockRight();
				}
				if (move == "left"){
					checkRockLeft();
				}
				
			}
			
			if (index > -1 && index < rock.children.length){
				if(rock.children[index].edgeRight == true && move == "right"){
					if (mysprite.x > rock.children[index].x + rock.children[index].width + 1){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
					}
				}
				if(rock.children[index].edgeLeft == true && move == "left"){
					if (mysprite.x < rock.children[index].x - 1){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
					}
				}
				
				if (nextElementRock = "rockRight" && mysprite.x > (rock.children[index].x + rock.children[index].width+1) && move == "right"){
					if(index != 9){
						index = index + 1;
					}
					
				}
				
				if (nextElementRock = "rockLeft" && mysprite.x < (rock.children[index].x - 1) && move == "left"){
					index = index - 1;
				}
	
			}
			
			if ((ground.y < mysprite.y+mysprite.height) && 
			(((move == "jump" && pos == "down") || (move == "jump" && pos == "up" && (rightButton.pressed == "true" || leftButton.pressed == "true")))
			||	(move == "jump" && pos == "down" && (jumpLeft == "true" || jumpRight == "true")))){
				upButton.pressed = "false";
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				mysprite.body.velocity.x = 0;
			}
			
			// if ((grass.y < mysprite.y+mysprite.height+2) && move == "jump" && pos == "down" && (jumpRight == "true" || jumpLeft =="true")){
				// mysprite.body.velocity.y = 0;
				// mysprite.body.velocity.x = 0;
				// mysprite.body.gravity.y = 0;
			// }
			
			
			// if(move == "right" || move =="left" || move == "jump"){
				// enemyCollision();
			// }
			
			if (move == "jump" && pos =="up"){
				for (en=0;en<enemies.children.length;en++){
					if (enemies.children[en].alive){
						if((enemies.children[en].x-2 < mysprite.x + mysprite.width) && (enemies.children[en].y-2 < mysprite.y+mysprite.height) && enemies.children[en].x + enemies.children[en].width > mysprite.x + mysprite.width){
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							enemies.children[en].kill();
							enemyKilled = 1;
							// mysprite.y = game.height/1.75;
						}
					}
					
				}
				
			}
			
			
			rightButton.onInputDown.add(rightDown,this);
			
			leftButton.onInputDown.add(leftDown);
			upButton.onInputDown.add(jumpPlayer);
			rightButton.onInputUp.add(rightUp,this);
			leftButton.onInputUp.add(leftUp,this);
			if (upButton.pressed !="true"){
				checkGround();
			}
			
			checkGround();
			
			if (pos == "up" || (pos == "down" && move == "jump")|| collision == 1 || rockCol == 1){
				stopScene();
			}
			
			// if (move == "left"  && mysprite.x < 1000 && pos != "up" && rockCol != 1){
				// if(mysprite.x > 170){
					// moveSceneLeft();
				// }
				// else{
					// moveSceneLeft();
					// mysprite.body.velocity.x = 0;
				// }
			// }
			
			// if (move == "right" && mysprite.x > 70 && pos != "up" && rockCol != 1){
				// if(mysprite.x < 800){
					// moveSceneRight();
				// }
				// else{
					// moveSceneRight();
					// mysprite.body.velocity.x = 0;
				// }
				
			// }
			
			moveEnemy();
			
			for (var i = 0;i<coins.children.length;i++){
				if(coins.children[i].alive){
					coins.children[i].animations.play('spin');
				}
				
			}
			
			// if (playerBaseLevel == "tube" || playerBaseLevel == "rock" || playerBaseLevel == "steps1" || playerBaseLevel == "steps2")
			
			
			// game.physics.arcade.collide(mysprite, enemies, myspriteEnemiesCollision, null, this);
			game.physics.arcade.collide(enemies, obstructs, enemyObstructCollision, null, this);
			game.physics.arcade.collide(mysprite, rock, myspriteRockCollision, null, this);
			// game.physics.arcade.collide(mysprite, coins, myspriteCoinCollision, null, this);
			game.physics.arcade.collide(mysprite, tubes, myspriteTubesCollision, null, this);
			game.physics.arcade.collide(mysprite, steps1, myspriteSteps1Collision, null, this);
			game.physics.arcade.collide(mysprite, steps2, myspriteSteps2Collision, null, this);
		}
	}
	
	// function checkEnemy(){
		// for (var en = 0;en<enemies.children.length;en++){
			// if(enemies.children[en].x < mysprite.x && (enemies.children[en].x +enemies.children[en].width) > mysprite.x
			// || (enemies.children[en].x < mysprite.x + mysprite.width && (enemies.children[en].x+enemies.children[en].width)>mysprite.x)){
				// enemies.children[en].kill();
				// break;
			// }
		// }
	// }
	
	
	// function myspriteGrassCollision(){
		// mysprite.body.velocity.x = 0;
		// mysprite.body.velocity.y = 0;
	// }
	
	function rightUp(){
		rightButton.pressed = "false";
	}
	function rightDown(){
		rightButton.pressed = "true";
		if (upButton.pressed == "true"){
			jumpPlayerRight();
		}
		else{
			movePlayerRight();
		}
	}
	
	function leftUp(){
		leftButton.pressed = "false";
	}
	function leftDown(){
		leftButton.pressed = "true";
		if (upButton.pressed == "true"){
			jumpPlayerLeft();
		}
		else{
			movePlayerLeft();
		}
	}
	
	function upUp(){
		upButton.pressed = "false";
	}
	
	function resetVar(){
		stepsInd = -1;
	}
	
	function checkRockRight(){
		if (index+1 < rock.children.length && index > -1){
			if ((rock.children[index].x + rock.children[index].width + 10)>rock.children[index+1].x){
				nextElementRock = "rockRight";
			}
			else{
				nextElementRock = "ground";
			}
		}
		
	}
	
	function checkRockLeft(){
		if (index - 1 >= 0 && index < rock.children.length){
			if (((rock.children[index].x - 10)<rock.children[index-1].x + rock.children[index-1].width) && ((rock.children[index].x - 10)>rock.children[index-1].x)){
				nextElementRock = "rockLeft";
			}
			else{
				nextElementRock = "ground";
			}
		}
		
	}
	
	function moveEnemy(){
		for (var i =0;i<enemies.children.length;i++){
			enemies.children[i].body.velocity.x = enemies.children[i].vel;
		}
	}
	
	function enemyObstructCollision(a,b){
		obstructIndex = b.parent.getIndex(b)
		b.body.immovable = true;
		b.body.moves = false;
		if (b.key == "lowerSteps"){
			steps2.children[obstructIndex].body.immovable = true;
			steps2.children[obstructIndex].body.moves = false;
		}
		else if (b.key == "steps2"){
			steps1.children[obstructIndex].body.immovable = true;
			steps1.children[obstructIndex].body.moves = false;
		}
		else{}
		
		b.body.velocity.x = 0;
		b.body.immovable = true;
		b.body.moves = false;
		enemyIndex = a.parent.getIndex(a);
		enemies.children[enemyIndex].vel = -enemies.children[enemyIndex].vel;
		enemies.children[enemyIndex].body.velocity.x = enemies.children[enemyIndex].vel;
	}
	
	function myspriteEnemiesCollision(a,b){
		if ((mysprite.body.facing == 1 || mysprite.body.facing == 2) && b.alive){
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			mysprite.kill();
			stopScene();
		}
	}
	
	function myspriteTubesCollision(a,b){
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		mysprite.animations.stop();
		collision = 1;
		tubeIndex = b.parent.getIndex(b);
		
		if (b.body.facing == 1 || b.body.touching.left 
			|| b.body.facing == 2 || b.body.touching.right){
				b.body.velocity.x = 0;
				b.body.immovable = true;
				b.body.moves = false;
				mysprite.body.velocity.x = 0;
				playerBaseLevel = "ground";
				stopScene();
		}
		
		if (b.body.facing == 4 || b.body.touching.up){
			b.body.velocity = 0;
			mysprite.body.y = b.body.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			upButton.pressed = "false";
			playerBaseLevel = "tube";
		}
	}
	
	function myspriteRock10Collision(b){
		check = 1;
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		index = b.parent.getIndex(b);
		mysprite.animations.stop();
		collision = 1;
		if (b.body.facing == 1
			|| b.body.facing == 2){
				mysprite.body.velocity.x = 0;
				b.body.immovable = true;
				b.body.moves = false;
				playerBaseLevel = "ground";
				b.body.velocity.x = 0;
				stopScene();
		}
		if (b.body.facing == 3){
			b.visible = false;
			b.kill();
			mysprite.body.y = ground.y - mysprite.height;
			mysprite.body.velocity.y = 0;
			playerBaseLevel = "ground";
		}
		if (b.body.facing == 4){
			rockCol = 4;
			mysprite.body.y = b.body.y - mysprite.height - 2;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			b.body.velocity.y = 0;
			b.body.velocity.x = 0;
			b.body.gravity.y = 0;
			b.body.immovable = true;
			b.body.move = false;
			upButton.pressed = "false";
			playerBaseLevel = "rock";
		}
		
	}
	
	function myspriteRockCollision(a,b){
		if (b != undefined){
			myspriteRock10Collision(b);
		}
	}
	
	function myspriteCoinCollision(a,b){
		if (b.body.facing > 0 || b.body.touching.none == false){
			b.visible = false;
			b.kill();
			rockCollision();
			tubeCollision();
			
			// mysprite.body.y = ground.y - mysprite.height;
			// mysprite.body.velocity.y = 0;
			// playerBaseLevel = "ground";
		}
	}
	
	function myspriteSteps1Collision(a,b){
		steps1Index = b.parent.getIndex(b);
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		
		mysprite.animations.stop();
		collision = 1;
		//left collision
		if (b.body.facing == 1 || b.body.facing == 2){
			
			b.body.immovable = true;
			b.body.moves = false;
			steps2.children[steps1Index].body.immovable = true;
			steps2.children[steps1Index].body.moves = false;
			
			// if (move == "stopRight"){
				mysprite.body.velocity.x = 0;
			// }
			stopScene();
		}
		
		//top collision
		if (b.body.facing == 4){
			mysprite.body.y = b.body.y - b.body.height;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			upButton.pressed = "false";
			playerBaseLevel = "steps1";
		}		
	}
	
	function myspriteSteps2Collision(a,b){
		steps2Index = b.parent.getIndex(b);
		if (move == "right"){
			move = "stopRight";
		}
		if (move == "left"){
			move = "stopLeft";
		}
		
		mysprite.animations.stop();
		collision = 1;
		//left collision
		if (b.body.facing == 1 || b.body.facing == 2){
			
			b.body.immovable = true;
			b.body.moves = false;
			steps1.children[steps2Index].body.immovable = true;
			steps1.children[steps2Index].body.moves = false;
			
			// if (move == "stopRight"){
				mysprite.body.velocity.x = 0;
			// }
			
			stopScene();
		}
		
		//top collision
		if (b.body.facing == 4){
			mysprite.body.y = b.body.y - b.body.height;
			b.body.velocity.y = 0;
			mysprite.body.gravity.y = 0;
			mysprite.body.velocity.x = 0;
			mysprite.body.velocity.y = 0;
			upButton.pressed = "false";
			playerBaseLevel = "steps2";
			stepsColIndex = stepsInd;
		}	
	}
	
	function movePlayerRight(){
		check = 0;
		myspriteState = "move";
		if ((move == "stopLeft" && collision == 1) || (move == "jump" && collision == 1)){
			collision = 0;
		}
		if ((move == "stopRight" && collision == 1 && jumpRight == "true") || (move == "jump" && collision == 1 && jumpRight == "true")){
			collision = 0;
		}
		if (collision == 1){
			stopScene();
		}
		
		if (collision == 0){
			rightButton.pressed = "true";
			mysprite.animations.play('right');
			move = "right";
			
			mysprite.body.velocity.x = 100;
		}
		
	}
	
	function movePlayerLeft(){
		check = 0;
		myspriteState = "move";
		if ((move == "stopRight" && collision == 1) || (move == "jump" && collision == 1)){
			collision = 0;
		}
		if ((move == "stopLeft" && collision == 1 && jumpLeft == "true") || (move == "jump" && collision == 1 && jumpRight == "true")){
			collision = 0;
		}
		if (collision == 1){
			stopScene();
		}
		
		if (collision == 0){
			leftButton.pressed = "true";
			mysprite.animations.play('left');
			move = "left";
				
			mysprite.body.velocity.x = -100;	
		}
	}
	
	function moveSceneRight(){
		// if (ground.x > -1200){
			// ground.x-=2;
		// }
		// else{
			// ground.x = 1000;
		// }
		// if (ground_dup.x > -1200){
			// ground_dup.x -= 2;
		// }
		// else{
			// ground_dup.x = 1000;
		// }
		
		for(var j = 0;j < steps1.children.length; j++){
			steps1.children[j].body.immovable = false;
			steps1.children[j].body.moves = true;
			steps1.children[j].body.velocity.x = -100;
		}
		
		for(var k = 0;k < steps2.children.length; k++){
			steps2.children[k].body.immovable = false;
			steps2.children[k].body.moves = true;
			steps2.children[k].body.velocity.x = -100;
		}
		
		for (var i = 0; i < rock.children.length; i++){
			rock.children[i].body.immovable = false;
			rock.children[i].body.moves = true;
			rock.children[i].body.velocity.x = -100;
		}
		
		for (var l = 0;l < tubes.children.length; l++){
			tubes.children[l].body.immovable = false;
			tubes.children[l].body.moves = true;
			tubes.children[l].body.velocity.x = -100;
		}
		
		for (var m = 0;m < coins.children.length; m++){
			coins.children[m].body.velocity.x = -100;
		}
	}
	
	function moveSceneLeft(){
		// if (ground.x < 1200){
			// ground.x+=2;
		// }
		// else{
			// ground.x = -1000;
		// }
		// if (ground_dup.x < 1200){
			// ground_dup.x += 2;
		// }
		// else{
			// ground_dup.x = -1000;
		// }
		
		for (var i = 0; i < rock.children.length; i++){
			rock.children[i].body.immovable = false;
			rock.children[i].body.moves = true;
			rock.children[i].body.velocity.x = 100;
		}
		for(var j = 0;j < steps1.children.length; j++){
			steps1.children[j].body.immovable = false;
			steps1.children[j].body.moves = true;
			steps1.children[j].body.velocity.x = 100;
		}
		
		for(var k = 0;k < steps2.children.length; k++){
			steps2.children[k].body.immovable = false;
			steps2.children[k].body.moves = true;
			steps2.children[k].body.velocity.x = 100;
		}	
		
		for (var l = 0;l < tubes.children.length; l++){
			tubes.children[l].body.immovable = false;
			tubes.children[l].body.moves = true;
			tubes.children[l].body.velocity.x = 100;
		}
		
		for (var m = 0;m < coins.children.length; m++){
			coins.children[m].body.velocity.x = 100;
		}
	}
   
	function stopScene(){
		for(var j = 0;j < steps1.children.length; j++){
			steps1.children[j].body.velocity.x = 0;
		}
		
		for(var k = 0;k < steps2.children.length; k++){
			steps2.children[k].body.velocity.x = 0;
		}
		for (var i = 0; i < rock.children.length; i++){
			rock.children[i].body.velocity.x = 0;
		}
		for (var l = 0; l < tubes.children.length; l++){
			tubes.children[l].body.velocity.x = 0;
		}
		for (var m = 0;m < coins.children.length; m++){
			coins.children[m].body.velocity.x = 0;
		}
	}
	
	function checkGround(){
		if(stepsColIndex != -1){
			if (playerBaseLevel == "steps2" && collision != 1){
				if ((steps2.children[stepsColIndex].x + steps2.children[stepsColIndex].width) < mysprite.x){
					if (mysprite.x > (steps2.children[stepsColIndex].x + steps2.children[stepsColIndex].width + 1)){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
						check = 1;
					}
					
				}
				if (playerBaseLevel == "steps2" && collision != 1 && steps2.children[stepsColIndex].x > (mysprite.x + mysprite.width)){
					if (steps1.children[stepsColIndex].x > (mysprite.x + mysprite.width) ){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
						check = 1;
					}
					else{
						mysprite.y = steps1.children[stepsColIndex].y - mysprite.height;
						// mysprite.body.gravity.y = 0;
						mysprite.body.gravity.y = 0;
						mysprite.body.velocity.x = 0;
						mysprite.body.velocity.y = 0;
						upButton.pressed = "false";
						playerBaseLevel = "steps1";
						check = 1;
					}
				}
			}
			
			if (playerBaseLevel == "steps1" && collision != 1){
				if ((steps1.children[stepsColIndex].x + steps1.children[stepsColIndex].width) < mysprite.x || steps1.children[stepsColIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					check = 1;
				}
			}
		}
		
		if (index != -1 && index < rock.children.length){
			if (playerBaseLevel == "rock" && collision != 1 && ((move == "right" && nextElementRock != "rockRight") || (move == "left" && nextElementRock != "rockLeft"))){
				if ((rock.children[index].x + rock.children[index].width) < mysprite.x || rock.children[index].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					check = 1;
				}	
			}
		}
		
		if (tubeIndex != -1 && tubeIndex < tubes.children.length){
			if (playerBaseLevel == "tube" && collision != 1){
				if ((tubes.children[tubeIndex].x + tubes.children[tubeIndex].width) < mysprite.x || tubes.children[tubeIndex].x > (mysprite.x + mysprite.width) ){
					mysprite.y = ground.y - mysprite.height;
					playerBaseLevel = "ground";
					check = 1;
				}	
			}
		}
	}
	
	function checkCollision(){
		resetVar();
		for (var stepsInde = 0;stepsInde < steps1.children.length; stepsInde++){
			if ((steps1.children[stepsInde].x < (mysprite.x + mysprite.width) && steps1.children[stepsInde].x+steps1.children[stepsInde].width > mysprite.x+(mysprite.width/2))){
				
				stepsInd = stepsInde;
					
				// if (steps1.children[stepsInd].body.facing == 0 
				 // && (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) < mysprite.x) || (steps1.children[stepsInd].x > mysprite.x))
				 // && steps2.children[stepsInd].body.facing == 0){
					// mysprite.y = ground.y - mysprite.height;
					// playerBaseLevel = "ground";
				// }
				// else{
					if (steps1.children[stepsInd].body.facing > 0 || (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) > mysprite.x) && (steps1.children[stepsInd].x < mysprite.x))){
						if (((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x < (mysprite.x + mysprite.width))){
							mysprite.y = steps2.children[stepsInd].y - mysprite.height;
							steps2.children[stepsInd].body.velocity.y = 0;
							mysprite.body.gravity.y = 0;
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							upButton.pressed = "false";
							playerBaseLevel = "steps2";
							stepsColIndex = stepsInd;
						}
						else if (((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x > (mysprite.x + (mysprite.width/2)))){
							mysprite.y = steps1.children[stepsInd].y - mysprite.height;
							mysprite.body.gravity.y = 0;
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							upButton.pressed = "false";
							playerBaseLevel = "step1";
							stepsColIndex = stepsInd;
						}
						else{
							mysprite.y = ground.y - mysprite.height;
							playerBaseLevel = "ground";
						}
						
					}
				// }
			}
		}
		
		// if (stepsInd == -1){
			// mysprite.y = ground.y - mysprite.height;
			// playerBaseLevel = "ground";
		// }
			
		rockCollision();
			
		tubeCollision();
		
		enemyCollision();
	}
	
	function jumpPlayerRight(){
		jumpRight = "true";
		mysprite.body.velocity.x = 100;
		mysprite.body.gravity.y = 100;
		setTimeout(function(){
			if ((ground.y < mysprite.y+mysprite.height) ){
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				mysprite.body.velocity.x = 0;
			}
			checkCollision();
		}	,1550)
	}
	
	function jumpPlayerLeft(){
		jumpLeft = "true";
		mysprite.body.velocity.x = -100;
		mysprite.body.gravity.y = 100;
		setTimeout(function(){
			if ((ground.y < mysprite.y+mysprite.height) ){
				mysprite.body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				mysprite.body.velocity.x = 0;
			}
			checkCollision();
		}	,1550)
	}
	
	function rockCollision(){
		if (enemyKilled != 1){
			for (var ind = 0;ind<rock.children.length;ind++){
				if(rock.children[ind].alive && check == 0){
					if (rock.children[ind].x < mysprite.x && (rock.children[ind].x+rock.children[ind].width) > mysprite.x
					){
						check = 1;
						mysprite.y = rock.children[ind].y - mysprite.height - 2;
						index = ind;
						mysprite.body.gravity.y = 0;
						mysprite.body.velocity.x = 0;
						mysprite.body.velocity.y = 0;
						rock.children[ind].body.immovable = true;
						rock.children[ind].body.moves = false;
						rock.children[ind].body.velocity.y = 0;
						rock.children[ind].body.velocity.x = 0;
						rock.children[ind].body.gravity.y = 0;
						upButton.pressed = "false";
						playerBaseLevel = "rock";
						break;
					}
				}
			}
		}
		
	}
	
	function tubeCollision(){
		for (var tub = 0;tub<tubes.children.length;tub++){
			
			if (tubes.children[tub].x < mysprite.x && (tubes.children[tub].x+tubes.children[tub].width) > mysprite.x
			|| (tubes.children[tub].x < mysprite.x + mysprite.width && (tubes.children[tub].x+tubes.children[tub].width) > mysprite.x)){
				mysprite.y = tubes.children[tub].y - mysprite.height;
				tubeIndex = tub;
				tubes.children[tub].body.velocity.y = 0;
				mysprite.body.gravity.y = 0;
				mysprite.body.velocity.x = 0;
				mysprite.body.velocity.y = 0;
				upButton.pressed = "false";
				playerBaseLevel = "tube";
				break;
			}	
		}
	}
	
	function enemyCollision(){
		for (var en = 0;en<enemies.children.length;en++){
			if (enemies.children[en].alive){
				if(((enemies.children[en].x < mysprite.x && (enemies.children[en].x +enemies.children[en].width) > mysprite.x
				|| (enemies.children[en].x < mysprite.x + mysprite.width && (enemies.children[en].x+enemies.children[en].width)>mysprite.x && (mysprite.y+mysprite.height > enemies.children[en].y-3)))
				&& mysprite.alive)){
					mysprite.body.velocity.y =0;
					mysprite.body.velocity.x =0;
					mysprite.y = enemies.children[en].y + enemies.children[en].height - mysprite.height;
					enemies.children[en].kill();
					enemyKilled = 1;
					break;
				}
			}
			
		}
	}
  
	function jumpPlayer(){
		upButton.pressed = "true";
		pos = "up";
		move = "jump";
		
		mysprite.body.velocity.y = -80;
		mysprite.body.velocity.x = 0;
		stopScene();
			
		setTimeout(function(){
			pos = "down";
			
			// mysprite.body.velocity.y = 0;
			if(jumpLeft != true && jumpRight != true){
				mysprite.body.gravity.y = 100;
			}
			
			
			
			resetVar();
			
			for (var stepsInde = 0;stepsInde < steps1.children.length; stepsInde++){
				if ((steps1.children[stepsInde].x < mysprite.x && steps1.children[stepsInde].x+steps1.children[stepsInde].width > mysprite.x+mysprite.width)){
			
					stepsInd = stepsInde;
			
					// if (((steps1.children[stepsInd].body.facing == 0 || (steps1.children[stepsInd].body.facing == 1 && jumpRight != "true" && jumpLeft != "true")) 
						// && (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) < mysprite.x) || (steps1.children[stepsInd].x > mysprite.x))
						// && (steps2.children[stepsInd].body.facing == 0 || (steps2.children[stepsInd].body.facing == 1 && jumpRight != "true" && jumpLeft != "true")))
						 // )
					// {
						// mysprite.y = game.height/1.75;
						// playerBaseLevel = "ground";
					// }
					// else{
						if ((steps1.children[stepsInd].body.facing > 0 || (((steps1.children[stepsInd].x + steps1.children[stepsInd].width) > mysprite.x) && (steps1.children[stepsInd].x < mysprite.x)))){
							if((((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x < mysprite.x+mysprite.width))){
								mysprite.y = steps2.children[stepsInd].y - mysprite.height;
								steps2.children[stepsInd].body.velocity.y = 0;
								mysprite.body.gravity.y = 0;
								mysprite.body.velocity.x = 0;
								mysprite.body.velocity.y = 0;
								upButton.pressed = "false";
								playerBaseLevel = "steps2";
								stepsColIndex = stepsInd;
							}
							else if ((((steps2.children[stepsInd].x + steps2.children[stepsInd].width) > mysprite.x) && (steps2.children[stepsInd].x > (mysprite.x+mysprite.width))) && (steps1.children[stepsInd].x < (mysprite.x + mysprite.width))){
								mysprite.y = steps1.children[stepsInd].y - mysprite.height;
								mysprite.body.gravity.y = 0;
								mysprite.body.velocity.x = 0;
								mysprite.body.velocity.y = 0;
								upButton.pressed = "false";
								playerBaseLevel = "steps1";
							}
							else{
								// mysprite.y = game.height/1.75;
								// playerBaseLevel = "ground";
							}
						}				
					// }
				}
			}
			// if (stepsInd == -1){
				// mysprite.y = game.height/1.75;
				// playerBaseLevel = "ground";
			// }
			
			rockCollision();
			
			tubeCollision();
			
			enemyCollision();
			
			mysprite.animations.stop();
		}	,1550)
	}
   
	function breakRock(){
		// rock.visible = false;
		mysprite.body.velocity.y = 0;
		mysprite.y = 260;
	}
	
	function stopPlayer(){
		if(mysprite.x <= steps1.x && mysprite.x >= steps1.x-32){
			rightMove = 0;
			// mysprite.body.velocity.y = 0;
			playerStop = 1;
		}
		if(mysprite.x >= steps1.x+steps1.width && mysprite.x <= steps1.x+steps1.width+8){
			leftMove = 0;
			// mysprite.body.velocity.y = 0;
			playerStop = 1;
		}
		
	}
	
	function diePlayer(){
		mysprite.visible=false;
	}