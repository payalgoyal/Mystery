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
var livesDeducted = false;
var pitFall = false;
var baseLevelChange = 0;
var timerEnd = 0;
var playerProperties = {
  velocity: 300,
}; 

var stage1LevelDesign6 = function(game){}
// Creates a new 'main' state that will contain the game
	stage1LevelDesign6.prototype = {
		preload: function() { 
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			game.load.image("nextLevel", "images/nextLevel.png");
			game.load.image("witch", "images/witch.png");
			game.load.image("heart", "images/lives.png");
			game.load.image("pit", "images/pit.png");
			game.load.spritesheet("rightSprite", "images/playerSprite.png",32,48);
			
		},
		create: function() { 
			// remLives = remLives - 1;
			pitFall = false;
			levelSuccess = 0;
			currStage = 1;
			stage1CurrLevel = 6;
			game.world.setBounds(0,0,20000,0);
			
			cloud = game.add.tileSprite(0, 0,20000,500, 'cloud');
			
			ground = game.add.tileSprite(0, game.height/1.5,20000,400, 'ground');
			
			fence = game.add.tileSprite(0,279,20000,45,"fence");
			grass = game.add.tileSprite(0, game.height/1.55, 20000, 15, "grass");
			
			levelAtTopText = game.add.text(game.width/2.3,10,"Level - "+stage1CurrLevel,{
				font:"bold 16px Arial", fill: "red" 
			});
			levelAtTopText.fixedToCamera = true;
			
			targetBox = game.add.sprite(9870,game.height/1.55-50,'targetBox');
			princess = game.add.sprite(9900,game.height/1.55-110,'princess');
			princess.width = 120;
			princess.height = 120;
			
			// jump = game.add.audio('jump');
			// brickBreaking = game.add.audio('brickBreaking');
			// coinCollect = game.add.audio('coinCollect');
			// energy = game.add.audio('energy');
			// treasureHit = game.add.audio('treasureHit');
			// enemyKill = game.add.audio('enemyKill');
			// run = new Phaser.Sound(game,'run',1,true);
			
			pits = game.add.group();
			pits.enableBody = true;
			pits.createMultiple(7,'pit');
			
			witch = game.add.sprite(200,110,'witch');
			witch.width = game.height/4;
			witch.height = game.height/4;
			witch.visible = false;
			
			steps1 = game.add.group();
			steps1.enableBody = true;
			steps1.createMultiple(7,'lowerSteps');
			
			steps2 = game.add.group();
			steps2.enableBody = true;
			steps2.createMultiple(7,'steps2');
			
			treasureBrick = game.add.group();
			treasureBrick.enableBody = true;
			treasureBrick.createMultiple(8,'treasureBrick');
			
			// for (var i = 0;i < treasureBrick.children.length;i++){
				// treasureBrick.children[i].traversed = 3;
			// }
			
			rock = game.add.group();
			rock.enableBody = true;
			rock.createMultiple(31, 'rock');
			
			for (var i =0;i<rock.children.length;i++){
				rock.children[i].body.velocity.y = 0;
				rock.children[i].body.gravity = 0;
			}
			
			coins = game.add.group();
			coins.enableBody = true;
			coins.createMultiple(23,'coinsSprite');
			
			tubes = game.add.group();
			tubes.enableBody = true;
			tubes.createMultiple(8, 'tube');
			
			enemies = game.add.group();
			enemies.enableBody = true;
			enemies.createMultiple(11,'villian');
			
			mysprite=game.add.sprite(game.width/6,game.height/1.75,'rightSprite');
			mysprite.frame=4;
			mysprite.energised = 0;
			mysprite.checkWorldBounds = true;
			mysprite.visible = true;
			mysprite.dying = false;
			livesDeducted = false;
			
			steps1.children[0].reset(740,game.height/1.55);
			steps2.children[0].reset(770,game.height/1.64);
			
			enemies.children[0].reset(890,game.height/1.65);
			enemies.children[0].vel = 100;
			
			rock.children[0].reset(936, game.height/2.65);
			rock.children[0].edgeLeft = true;
			rock.children[1].reset(976, game.height/2.65);
			treasureBrick.children[0].reset(1016,game.height/2.65);
			treasureBrick.children[0].power = 1;
			treasureBrick.children[0].traversed = false;
			rock.children[2].reset(1056, game.height/2.65);
			treasureBrick.children[1].reset(1096,game.height/2.65);
			treasureBrick.children[1].traversed = 3;
			treasureBrick.children[1].edgeRight = true;
			
			tubes.children[0].reset(1230,game.height/1.9);
			
			enemies.children[1].reset(1450,game.height/1.65);
			enemies.children[1].vel = 200;
			
			enemies.children[2].reset(1550,game.height/1.65);
			enemies.children[2].vel = 100;
			
			pits.children[0].reset(1900,279);
			pits.children[0].height = 200;
			
			rock.children[3].reset(2060, game.height/2.65);
			rock.children[3].edgeLeft = true;
			rock.children[4].reset(2100, game.height/2.65);
			rock.children[5].reset(2140, game.height/2.65);
			rock.children[6].reset(2180, game.height/2.65);
			rock.children[7].reset(2200, game.height/2.65);
			rock.children[7].edgeRight = true;
			
			rock.children[8].reset(2060, game.height/6);
			rock.children[8].edgeLeft = true;
			rock.children[9].reset(2100, game.height/6);
			rock.children[10].reset(2140, game.height/6);
			rock.children[11].reset(2180, game.height/6);
			rock.children[12].reset(2200, game.height/6);
			rock.children[12].edgeRight = true;
			
			enemies.children[3].reset(2450,game.height/1.65);
			enemies.children[3].vel = 200;
			
			enemies.children[4].reset(2250,game.height/1.65);
			enemies.children[4].vel = 100;
			
			steps1.children[1].reset(2500,game.height/1.55);
			steps2.children[1].reset(2530,game.height/1.64);
			
			tubes.children[1].reset(2730,game.height/1.9);
			
			coins.children[0].reset(2880,100);
			coins.children[0].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[1].reset(2920,100);
			coins.children[1].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[2].reset(2960,100);
			coins.children[2].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[3].reset(3000,100);
			coins.children[3].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[4].reset(2880,150);
			coins.children[4].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[5].reset(2920,150);
			coins.children[5].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[6].reset(2960,150);
			coins.children[6].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[7].reset(3000,150);
			coins.children[7].animations.add('spin',[0,1,2,3],10,true);
			
			pits.children[1].reset(3300,279);
			pits.children[1].height = 200;
			
			tubes.children[2].reset(3630,game.height/1.9);
			
			coins.children[8].reset(3710,game.height/1.9);
			coins.children[8].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[9].reset(3750,game.height/1.9);
			coins.children[9].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[10].reset(3790,game.height/1.9);
			coins.children[10].animations.add('spin',[0,1,2,3],10,true);
			
			tubes.children[3].reset(3830,game.height/1.9);
			
			pits.children[2].reset(4000,279);
			pits.children[2].height = 200;
			
			rock.children[13].reset(4260, game.height/6);
			rock.children[13].edgeLeft = true;
			rock.children[14].reset(4300, game.height/6);
			treasureBrick.children[2].reset(4340, game.height/6);
			treasureBrick.children[2].traversed = false;
			treasureBrick.children[2].power = 1;
			treasureBrick.children[3].reset(4380, game.height/6);
			treasureBrick.children[3].traversed = false;
			rock.children[15].reset(4420, game.height/6);
			rock.children[15].edgeRight = true;
			
			pits.children[3].reset(4600,279);
			pits.children[3].height = 200;
			
			steps1.children[2].reset(4750,game.height/1.55);
			steps2.children[2].reset(4780,game.height/1.64);
			
			enemies.children[5].reset(4880,game.height/1.65);
			enemies.children[5].vel = 100;
			
			steps1.children[3].reset(5000,game.height/1.55);
			steps2.children[3].reset(5030,game.height/1.64);
			
			rock.children[16].reset(5260, game.height/6);
			rock.children[16].edgeLeft = true;
			rock.children[17].reset(5300, game.height/6);
			rock.children[18].reset(5340, game.height/6);
			rock.children[18].edgeRight = true;
			
			coins.children[11].reset(5260,100);
			coins.children[11].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[12].reset(5300,100);
			coins.children[12].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[13].reset(5340,100);
			coins.children[13].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[14].reset(5260,game.height/1.9);
			coins.children[14].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[15].reset(5300,game.height/1.9);
			coins.children[15].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[16].reset(5340,game.height/1.9);
			coins.children[16].animations.add('spin',[0,1,2,3],10,true);
			
			enemies.children[6].reset(5280,game.height/1.65);
			enemies.children[6].vel = 100;
			
			pits.children[4].reset(5440,279);
			pits.children[4].height = 200;
			
			tubes.children[4].reset(5630,game.height/1.9);
			
			enemies.children[7].reset(5780,game.height/1.65);
			enemies.children[7].vel = 100;
			
			steps1.children[4].reset(5900,game.height/1.55);
			steps2.children[4].reset(5930,game.height/1.64);
			
			treasureBrick.children[4].reset(6100, game.height/6);
			treasureBrick.children[4].edgeLeft = true;
			treasureBrick.children[4].traversed = false;
			treasureBrick.children[4].power = 1;
			rock.children[19].reset(6140, game.height/6);
			rock.children[20].reset(6180, game.height/6);
			rock.children[21].reset(6220, game.height/6);
			treasureBrick.children[5].reset(6260, game.height/6);
			treasureBrick.children[5].edgeRight = true;
			treasureBrick.children[5].traversed = 3;
			
			enemies.children[8].reset(6780,game.height/1.65);
			enemies.children[8].vel = 100;
			
			steps1.children[5].reset(6900,game.height/1.55);
			steps2.children[5].reset(6930,game.height/1.64);
			
			pits.children[5].reset(7100,279);
			pits.children[5].height = 200;
			
			tubes.children[5].reset(7430,game.height/1.9);
			
			enemies.children[9].reset(7680,game.height/1.65);
			enemies.children[9].vel = 100;
			
			steps1.children[6].reset(7900,game.height/1.55);
			steps2.children[6].reset(7930,game.height/1.64);
			
			rock.children[22].reset(8240, game.height/6);
			rock.children[22].edgeLeft = true;
			rock.children[23].reset(8280, game.height/6);
			rock.children[24].reset(8320, game.height/6);
			rock.children[24].edgeRight = true;
			
			rock.children[25].reset(8240, game.height/6);
			rock.children[25].edgeLeft = true;
			rock.children[26].reset(8280, game.height/6);
			rock.children[27].reset(8320, game.height/6);
			treasureBrick.children[6].reset(8360, game.height/6);
			treasureBrick.children[6].edgeRight = true;
			treasureBrick.children[6].traversed = 3;
			
			pits.children[6].reset(8500,279);
			pits.children[6].height = 200;
			
			coins.children[17].reset(8650,100);
			coins.children[17].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[18].reset(8690,100);
			coins.children[18].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[19].reset(8730,100);
			coins.children[19].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[20].reset(8890,game.height/1.9);
			coins.children[20].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[21].reset(8930,game.height/1.9);
			coins.children[21].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[22].reset(8970,game.height/1.9);
			coins.children[22].animations.add('spin',[0,1,2,3],10,true);
			
			rock.children[28].reset(9140, game.height/6);
			rock.children[28].edgeLeft = true;
			rock.children[29].reset(9180, game.height/6);
			rock.children[30].reset(9220, game.height/6);
			treasureBrick.children[7].reset(9260, game.height/6);
			treasureBrick.children[7].edgeRight = true;
			treasureBrick.children[7].traversed = 3;
			
			tubes.children[6].reset(9340,game.height/1.9);
			
			enemies.children[10].reset(9480,game.height/1.65);
			enemies.children[10].vel = 100;
			
			tubes.children[7].reset(9630,game.height/1.9);
			
			energyBottle = game.add.sprite(-1000,-1000,'energyBottle');
			
			obstructs.push(tubes);
			obstructs.push(rock);
			obstructs.push(steps1);
			obstructs.push(pits);
			
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
			
			coinsText = game.add.text(game.width/1.5,30,"Coins Collected - 0",{
				font:"bold 24px Arial", fill: "red" 
			});
			coinsText.fixedToCamera = true;
			
			livesText = game.add.text(10,30,"Remaining Lives - ",{
				font:"bold 24px Arial", fill: "red" 
			});
			livesText.fixedToCamera = true;
			for (var l =0;l<remLives;l++){
				heart = game.add.sprite(livesText.width+10+l*35,30,'heart');
				heart.fixedToCamera = true;
			}
			
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
			updateFunctions();
		},
	}
	
	