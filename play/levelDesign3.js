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
var nextElement = "test";
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
var score = 0;
var coinCollected = 0;

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
			
			game.load.image("rightArrow", "images/rightArrow.png");
			game.load.image("leftArrow", "images/leftArrow.png");
			game.load.image("upArrow", "images/upArrow.png");
			
			game.load.image("underground", "images/underground.png");
			
			game.load.image("fence", "images/fence2.png");
			
			game.load.spritesheet("enemiesSprite", "images/enemiesSpritesheet.png");
			
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			
			game.load.spritesheet("rightSprite", "images/dude.png",32,48);
			
			game.load.audio('jump', 'sounds/jump.mp3');
			game.load.audio('walk', 'sounds/walk.mp3');
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
			
			ground = game.add.tileSprite(0, game.height/1.5,10000,400, 'ground');
			// ground.width = 1800;
			// ground_dup = game.add.sprite(1200, 300, 'ground');
			// ground_dup.width = 1500;
			
			fence = game.add.tileSprite(0,279,10000,45,"fence");
			grass = game.add.tileSprite(0, game.height/1.55, 10000, 15, "grass");
			
			jump = game.add.audio('jump');
			walk = new Phaser.Sound(game,'walk',1,true);
			
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
			
			rock.children[0].reset(856, game.height/2.65);
			rock.children[1].reset(896, game.height/2.65);
			rock.children[2].reset(936, game.height/2.65);
			
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
			
			coins.children[0].reset(850,150);
			coins.children[0].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[1].reset(890,150);
			coins.children[1].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[2].reset(930,150);
			coins.children[2].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[3].reset(1360,150);
			coins.children[3].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[4].reset(1400,150);
			coins.children[4].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[5].reset(1440,150);
			coins.children[5].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[6].reset(1480,150);
			coins.children[6].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[7].reset(1320,200);
			coins.children[7].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[8].reset(1360,200);
			coins.children[8].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[9].reset(1400,200);
			coins.children[9].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[10].reset(1440,200);
			coins.children[10].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[11].reset(1480,200);
			coins.children[11].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[12].reset(1520,200);
			coins.children[12].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[13].reset(1560,200);
			coins.children[13].animations.add('spin',[0,1,2,3],10,true);
			
			mysprite.animations.add('left',[0,1,2,3],4,true);
			mysprite.animations.add('right',[5,6,7,8],4,true);
			
			scoreText = game.add.text(10,10,"Score - ",{
				font:"bold 16px Arial", fill: "red" 
			});
			scoreText.fixedToCamera = true;
			
			coinsText = game.add.text(150,10,"Coins - ",{
				font:"bold 16px Arial", fill: "red" 
			});
			coinsText.fixedToCamera = true;
			
			lives = game.add.text(300,10,"Lives - ",{
				font:"bold 16px Arial", fill: "red" 
			});
			lives.fixedToCamera = true;
			
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
				if(rock.children[index].edge == "right" && move == "right"){
					if (mysprite.x > rock.children[index].x + rock.children[index].width + 1){
						mysprite.y = game.height/1.75;
						playerBaseLevel = "ground";
					}
				}
				if(rock.children[index].edge == "left" && move == "left"){
					if (mysprite.x < rock.children[index].x - 1){
						mysprite.y = game.height/1.75;
						playerBaseLevel = "ground";
					}
				}
				
				if (nextElement = "rockRight" && mysprite.x > (rock.children[index].x + rock.children[index].width+1) && move == "right"){
					if(index != 9){
						index = index + 1;
					}
					
				}
				
				if (nextElement = "rockLeft" && mysprite.x < (rock.children[index].x - 1) && move == "left"){
					index = index - 1;
				}
	
			}
			
			if (move == "jump" && pos =="up"){
				for (en=0;en<enemies.children.length;en++){
					if (enemies.children[en].alive){
						if((enemies.children[en].x-2 < mysprite.x + mysprite.width) && (enemies.children[en].y-2 < mysprite.y+mysprite.height) && enemies.children[en].x + enemies.children[en].width > mysprite.x + mysprite.width){
							mysprite.body.velocity.x = 0;
							mysprite.body.velocity.y = 0;
							enemies.children[en].kill();
							enemyKilled = 1;
							score++;
							scoreText.text = "Score - " + score;
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
			
			spinCoin();			
			
			game.physics.arcade.collide(mysprite, enemies, myspriteEnemiesCollision, null, this);
			game.physics.arcade.collide(enemies, obstructs, enemyObstructCollision, null, this);
			game.physics.arcade.collide(mysprite, rock, myspriteRockCollision, null, this);
			game.physics.arcade.collide(mysprite, coins, myspriteCoinCollision, null, this);
			game.physics.arcade.collide(mysprite, tubes, myspriteTubesCollision, null, this);
			game.physics.arcade.collide(mysprite, steps1, myspriteSteps1Collision, null, this);
			game.physics.arcade.collide(mysprite, steps2, myspriteSteps2Collision, null, this);
		}
	}
	
	