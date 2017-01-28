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
var tresIndex = -1;
var tresCheck = 0;
var coinsCollected = 0;
var jumpCount = 0;
var move = "stand";

var playerProperties = {
  velocity: 300,
}; 

var levelDesign1 = function(game){}
// Creates a new 'main' state that will contain the game
	levelDesign1.prototype = {
		preload: function() { 
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			game.load.image("nextLevel", "images/nextLevel.png");
			game.load.image("witch", "images/witch.png");
			game.load.spritesheet("rightSprite", "images/playerSprite.png",32,48);
			
		},
		create: function() { 
			game.world.setBounds(0,0,20000,0);
			
			cloud = game.add.tileSprite(0, 0,20000,500, 'cloud');
			
			ground = game.add.tileSprite(0, game.height/1.5,20000,400, 'ground');
			
			fence = game.add.tileSprite(0,279,20000,45,"fence");
			grass = game.add.tileSprite(0, game.height/1.55, 20000, 15, "grass");
			
			targetBox = game.add.sprite(9170,game.height/1.55-50,'targetBox');
			princess = game.add.sprite(9200,game.height/1.55-110,'princess');
			princess.width = 120;
			princess.height = 120;
			
			// jump = game.add.audio('jump');
			// brickBreaking = game.add.audio('brickBreaking');
			// coinCollect = game.add.audio('coinCollect');
			// energy = game.add.audio('energy');
			// treasureHit = game.add.audio('treasureHit');
			// enemyKill = game.add.audio('enemyKill');
			// run = new Phaser.Sound(game,'run',1,true);
			
			witch = game.add.sprite(200,110,'witch');
			witch.width = game.height/4;
			witch.height = game.height/4;
			witch.visible = false;
			
			steps1 = game.add.group();
			steps1.enableBody = true;
			steps1.createMultiple(3,'lowerSteps');
			
			steps2 = game.add.group();
			steps2.enableBody = true;
			steps2.createMultiple(3,'steps2');
			
			treasureBrick = game.add.group();
			treasureBrick.enableBody = true;
			treasureBrick.createMultiple(4,'treasureBrick');
			
			for (var i = 0;i < treasureBrick.children.length;i++){
				treasureBrick.children[i].traversed = false;
			}
			
			rock = game.add.group();
			rock.enableBody = true;
			rock.createMultiple(16, 'rock');
			
			for (var i =0;i<rock.children.length;i++){
				rock.children[i].body.velocity.y = 0;
				rock.children[i].body.gravity = 0;
			}
			
			coins = game.add.group();
			coins.enableBody = true;
			coins.createMultiple(16,'coinsSprite');
			
			tubes = game.add.group();
			tubes.enableBody = true;
			tubes.createMultiple(4, 'tube');
			
			enemies = game.add.group();
			enemies.enableBody = true;
			enemies.createMultiple(7,'villian');
			
			enemies.children[0].reset(1390,game.height/1.65);
			enemies.children[0].vel = 100;
			
			enemies.children[1].reset(2750,game.height/1.65);
			enemies.children[1].vel = 200;
			
			enemies.children[2].reset(3000,game.height/1.65);
			enemies.children[2].vel = 100;
			
			enemies.children[3].reset(3800,game.height/1.65);
			enemies.children[3].vel = 100;
			
			enemies.children[4].reset(4190,game.height/1.65);
			enemies.children[4].vel = 100;
			
			enemies.children[5].reset(4490,game.height/1.65);
			enemies.children[5].vel = 100;
			
			enemies.children[6].reset(5790,game.height/1.65);
			enemies.children[6].vel = 100;
			
			mysprite=game.add.sprite(game.width/6,game.height/1.75,'rightSprite');
			mysprite.frame=4;
			mysprite.energised = 0;
			mysprite.checkWorldBounds = true;
			
			rock.children[0].reset(856, game.height/2.65);
			rock.children[0].edgeLeft = true;
			treasureBrick.children[0].reset(896,game.height/2.65);
			treasureBrick.children[0].power = 1;
			rock.children[1].reset(936, game.height/2.65);
			rock.children[1].edgeRight = true;
			
			coins.children[0].reset(850,100);
			coins.children[0].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[1].reset(890,100);
			coins.children[1].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[2].reset(930,100);
			coins.children[2].animations.add('spin',[0,1,2,3],10,true);
			
			tubes.children[0].reset(1330,game.height/1.9);
			
			rock.children[2].reset(1720, game.height/6);
			rock.children[2].edgeLeft = true;
			rock.children[3].reset(1760, game.height/6);
			rock.children[4].reset(1800, game.height/6);
			rock.children[5].reset(1840, game.height/6);
			rock.children[5].edgeRight = true;
			
			steps1.children[0].reset(2340,game.height/1.55);
			steps2.children[0].reset(2370,game.height/1.64);
			
			coins.children[3].reset(2760,100);
			coins.children[3].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[4].reset(2800,100);
			coins.children[4].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[5].reset(2840,100);
			coins.children[5].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[6].reset(2720,150);
			coins.children[6].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[7].reset(2760,150);
			coins.children[7].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[8].reset(2800,150);
			coins.children[8].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[9].reset(2840,150);
			coins.children[9].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[10].reset(2880,150);
			coins.children[10].animations.add('spin',[0,1,2,3],10,true);	
			
			treasureBrick.children[1].reset(3200,game.height/2.65);
			treasureBrick.children[1].edgeLeft = true;
			treasureBrick.children[2].reset(3240,game.height/2.65);
			treasureBrick.children[2].edgeRight = true;
			
			tubes.children[1].reset(3730,game.height/1.9);
			tubes.children[2].reset(3900,game.height/1.9);
			
			rock.children[6].reset(4320, game.height/6);
			rock.children[6].edgeLeft = true;
			rock.children[7].reset(4360, game.height/6);
			rock.children[7].edgeRight = true;
			
			treasureBrick.children[3].reset(4420,game.height/6);
			treasureBrick.children[3].edgeLeft = true;
			treasureBrick.children[3].edgeRight = true;
			
			coins.children[11].reset(4620,150);
			coins.children[11].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[12].reset(4660,150);
			coins.children[12].animations.add('spin',[0,1,2,3],10,true);	
			
			steps1.children[1].reset(5100,game.height/1.55);
			steps2.children[1].reset(5130,game.height/1.64);		
			
			rock.children[8].reset(5720, game.height/2.65);
			rock.children[8].edgeLeft = true;
			rock.children[9].reset(5760, game.height/2.65);
			rock.children[10].reset(5800, game.height/2.65);
			rock.children[11].reset(5840, game.height/2.65);
			rock.children[11].edgeRight = true;
			
			treasureBrick.children[3].reset(5800,game.height/6);
			treasureBrick.children[3].edgeLeft = true;
			rock.children[12].reset(5840, game.height/6);
			rock.children[12].edgeRight = true;
			
			tubes.children[3].reset(6630,game.height/1.9);
			
			steps1.children[2].reset(7500,game.height/1.55);
			steps2.children[2].reset(7530,game.height/1.64);
			
			rock.children[13].reset(8920, game.height/2.65);
			rock.children[13].edgeLeft = true;
			rock.children[14].reset(8960, game.height/2.65);
			rock.children[15].reset(9000, game.height/2.65);
			rock.children[15].edgeRight = true;
			
			coins.children[13].reset(8920,150);
			coins.children[13].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[14].reset(8960,150);
			coins.children[14].animations.add('spin',[0,1,2,3],10,true);

			coins.children[15].reset(9000,150);
			coins.children[15].animations.add('spin',[0,1,2,3],10,true);
			
			energyBottle = game.add.sprite(-1000,-1000,'energyBottle');
			
			obstructs.push(tubes);
			obstructs.push(rock);
			obstructs.push(steps1);
			
			rightButton = game.add.button(game.camera.view.width/2,game.camera.view.height-50,'rightArrow');
			rightButton.fixedToCamera = true;
			leftButton = game.add.button(game.camera.view.width/3.5,game.camera.view.height-50,'leftArrow');
			leftButton.fixedToCamera = true;
			upButton = game.add.button(game.camera.view.width/2.6,game.camera.view.height-90,'upArrow');
			upButton.fixedToCamera = true;
			nextLevel = game.add.button(game.camera.view.width/0.8,game.camera.view.height-90,'nextLevel');
			nextLevel.fixedToCamera = true;
			nextLevel.inputEnabled = false;
			nextLevel.visible = false;
			
			rightButton.pressed = "false";
			
			leftButton.pressed = "false";
			upButton.pressed = "false";
			
			coinsText = game.add.text(150,10,"Coins - ",{
				font:"bold 16px Arial", fill: "red" 
			});
			coinsText.fixedToCamera = true;
			
			mysprite.animations.add('left',[0,1,2,3],10,true);
			mysprite.animations.add('right',[5,6,7,8],10,true);
			mysprite.animations.add('leftEnergy',[9,10,11,12],4,true);
			mysprite.animations.add('rightEnergy',[14,15,16,17],4,true);
			mysprite.animations.add('leftJumpEnergy',[4,10],10,true);
			mysprite.animations.add('rightJumpEnergy',[4,14],10,true);
			
			game.physics.enable(princess, Phaser.Physics.ARCADE);
			game.physics.enable(targetBox, Phaser.Physics.ARCADE);
			game.physics.enable(grass, Phaser.Physics.ARCADE);
			game.physics.enable(enemies, Phaser.Physics.ARCADE);
			game.physics.enable(ground, Phaser.Physics.ARCADE);
			game.physics.enable(rock, Phaser.Physics.ARCADE);
			game.physics.enable(steps1, Phaser.Physics.ARCADE);
			game.physics.enable(steps2, Phaser.Physics.ARCADE);
			game.physics.enable(tubes, Phaser.Physics.ARCADE);
			
			game.physics.enable(mysprite, Phaser.Physics.ARCADE);
			// cursors = game.input.keyboard.createCursorKeys();
			game.camera.follow(mysprite);
		},
		update: function() { 
			if (mysprite.y  > game.height/1.75 + 5){
				mysprite.y = game.height/1.75;
			}
			// if (mysprite.body.velocity.x == 0){
				// my_media.stop();
			// }
			
			checkWitchVisibility();		
		
			if (mysprite.energised == 1){
				if (move == "right"){
					mysprite.animations.play('rightEnergy');
				}
				else if (move == "left"){
					mysprite.animations.play('leftEnergy');
				}
				else if (jumpRight == "true"){
					mysprite.animations.play('rightJumpEnergy');
				}
				else{
					mysprite.animations.play('leftJumpEnergy');
				}
				
				setTimeout(function(){
					mysprite.energised = 0;
					energyComplete();
				},15000)
			}
			

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
					// checkRockTresRight();
				}
				if (move == "left"){
					checkRockLeft();
					// checkRockTresLeft();
				}
				
			}
			
			if(playerBaseLevel == "treasure"){
				if (move == "right"){
					checkTresRight();
				}
				if (move == "left"){
					checkTresLeft();
				}
				
			}
			
			if (tresIndex > -1 && tresIndex < treasureBrick.children.length){
				if(treasureBrick.children[tresIndex].edgeRight == true && move == "right"){
					if (mysprite.x > treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width + 1){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
					}
				}
				if(treasureBrick.children[tresIndex].edgeLeft == true && move == "left"){
					if (mysprite.x < treasureBrick.children[tresIndex].x - 1){
						mysprite.y = ground.y - mysprite.height;
						playerBaseLevel = "ground";
					}
				}
				
				if (nextElementRock = "treasureRight" && mysprite.x > (treasureBrick.children[tresIndex].x + treasureBrick.children[tresIndex].width+1) && move == "right"){
					if(tresIndex < treasureBrick.children.length-1){
						tresIndex = tresIndex + 1;
					}
					
				}
				
				if (nextElementRock = "treasureLeft" && mysprite.x < (treasureBrick.children[tresIndex].x - 1) && move == "left"){
					tresIndex = tresIndex - 1;
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
				jumpCount = 0;
			}
			
			
			if (move == "jump" ){
				for (en=0;en<enemies.children.length;en++){
					if (enemies.children[en].alive && mysprite.alive){
						if((enemies.children[en].x-2 < mysprite.x + mysprite.width) && (enemies.children[en].y-2 < mysprite.y+mysprite.height) && enemies.children[en].x + enemies.children[en].width > mysprite.x + mysprite.width){
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							
							enemies.children[en].body.velocity.y = 0;
							enemies.children[en].body.gravity.y = 0;
							
							enemyDyin = game.add.sprite(enemies.children[en].body.x,enemies.children[en].body.y + enemies.children[en].body.height - 10,'enemyDie');
							// playAudio("enemyKilled");
							enemies.children[en].kill();
							setTimeout(function(){
								enemyDyin.kill();
							},300);
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
			
			moveEnemy();
			
			for (var i = 0;i<coins.children.length;i++){
				if(coins.children[i].alive){
					coins.children[i].animations.play('spin');
				}
				
			}
			
			// // if (playerBaseLevel == "tube" || playerBaseLevel == "rock" || playerBaseLevel == "steps1" || playerBaseLevel == "steps2")
			
			game.physics.arcade.collide(mysprite, targetBox, myspriteMysteryCollision, null, this);
			game.physics.arcade.collide(mysprite, princess, myspriteMysteryCollision, null, this);
			game.physics.arcade.collide(mysprite, energyBottle, myspriteEnergyCollision, null, this);
			game.physics.arcade.collide(mysprite, enemies, myspriteEnemiesCollision, null, this);
			game.physics.arcade.collide(enemies, obstructs, enemyObstructCollision, null, this);
			game.physics.arcade.collide(mysprite, rock, myspriteRockCollision, null, this);
			game.physics.arcade.collide(mysprite, treasureBrick, myspriteTreasureCollision, null, this);
			game.physics.arcade.collide(mysprite, coins, myspriteCoinCollision, null, this);
			game.physics.arcade.collide(mysprite, tubes, myspriteTubesCollision, null, this);
			game.physics.arcade.collide(mysprite, steps1, myspriteSteps1Collision, null, this);
			game.physics.arcade.collide(mysprite, steps2, myspriteSteps2Collision, null, this);
		}
	}
	
	