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

var stage2LevelDesign7 = function(game){}
// Creates a new 'main' state that will contain the game
	stage2LevelDesign7.prototype = {
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
			currStage = 2;
			stage2CurrLevel = 7;
			
			game.world.setBounds(0,0,20000,0);
			
			cloud = game.add.tileSprite(0, 0,20000,500, 'cloud');
			
			ground = game.add.tileSprite(0, game.height/1.5,20000,400, 'ground');
			
			fence = game.add.tileSprite(0,279,20000,45,"fence");
			grass = game.add.tileSprite(0, game.height/1.55, 20000, 15, "grass");
			
			levelAtTopText = game.add.text(game.width/2.3,10,"Level - "+stage2CurrLevel,{
				font:"bold 16px Arial", fill: "red" 
			});
			levelAtTopText.fixedToCamera = true;
			
			targetBox = game.add.sprite(9350,game.height/1.55-50,'targetBox');
			princess = game.add.sprite(9380,game.height/1.55-110,'princess');
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
			pits.createMultiple(10,'pit');
			
			witch = game.add.sprite(200,110,'witch');
			witch.width = game.height/4;
			witch.height = game.height/4;
			witch.visible = false;
			
			steps1 = game.add.group();
			steps1.enableBody = true;
			steps1.createMultiple(4,'lowerSteps');
			
			steps2 = game.add.group();
			steps2.enableBody = true;
			steps2.createMultiple(4,'steps2');
			
			treasureBrick = game.add.group();
			treasureBrick.enableBody = true;
			treasureBrick.createMultiple(15,'treasureBrick');
			
			// for (var i = 0;i < treasureBrick.children.length;i++){
				// treasureBrick.children[i].traversed = 3;
			// }
			
			rock = game.add.group();
			rock.enableBody = true;
			rock.createMultiple(34, 'rock');
			
			for (var i =0;i<rock.children.length;i++){
				rock.children[i].body.velocity.y = 0;
				rock.children[i].body.gravity = 0;
			}
			
			coins = game.add.group();
			coins.enableBody = true;
			coins.createMultiple(28,'coinsSprite');
			
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
			
			enemies.children[0].reset(870,game.height/1.65);
			enemies.children[0].vel = 100;
			
			rock.children[0].reset(856, game.height/2.65);
			rock.children[0].edgeLeft = true;
			rock.children[1].reset(896,game.height/2.65);
			rock.children[2].reset(936, game.height/2.65);
			rock.children[2].edgeRight = true;
			
			rock.children[3].reset(1006, game.height/2.65);
			rock.children[3].edgeLeft = true;
			rock.children[4].reset(1046,game.height/2.65);
			rock.children[5].reset(1086, game.height/2.65);
			rock.children[5].edgeRight = true;
			
			pits.children[0].reset(1200,279);
			pits.children[0].height = 200;
			
			steps1.children[0].reset(1340,game.height/1.55);
			steps2.children[0].reset(1370,game.height/1.64);
			
			enemies.children[1].reset(1470,game.height/1.65);
			enemies.children[1].vel = 100;
			
			enemies.children[2].reset(1520,game.height/1.65);
			enemies.children[2].vel = 100;
			
			tubes.children[0].reset(1550,game.height/1.9);
			
			rock.children[6].reset(1670, game.height/2.65);
			rock.children[6].edgeLeft = true;
			rock.children[7].reset(1710,game.height/2.65);
			rock.children[8].reset(1750, game.height/2.65);
			rock.children[8].edgeRight = true;
			
			treasureBrick.children[0].reset(1870, game.height/2.65);
			treasureBrick.children[0].edgeLeft = true;
			treasureBrick.children[0].traversed = 4;
			treasureBrick.children[1].reset(1910, game.height/2.65);
			treasureBrick.children[1].traversed = 4;
			treasureBrick.children[2].reset(1950, game.height/2.65);
			treasureBrick.children[2].edgeRight = true;
			treasureBrick.children[2].traversed = false;
			treasureBrick.children[2].power = 1;
			
			rock.children[9].reset(2140, game.height/2.65);
			rock.children[9].edgeLeft = true;
			rock.children[10].reset(2180,game.height/2.65);
			rock.children[11].reset(2220, game.height/2.65);
			rock.children[11].edgeRight = true;
			
			coins.children[0].reset(2140,100);
			coins.children[0].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[1].reset(2180,100);
			coins.children[1].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[2].reset(2220,100);
			coins.children[2].animations.add('spin',[0,1,2,3],10,true);
			
			pits.children[1].reset(2400,279);
			pits.children[1].height = 200;
			
			rock.children[12].reset(2550, game.height/2.65);
			rock.children[12].edgeLeft = true;
			rock.children[13].reset(2590,game.height/2.65);
			treasureBrick.children[3].reset(2630, game.height/2.65);
			treasureBrick.children[3].traversed = 4;
			treasureBrick.children[4].reset(2670, game.height/2.65);
			treasureBrick.children[4].traversed = 4;
			rock.children[15].reset(2710, game.height/2.65);
			rock.children[15].edgeRight = true;
			
			pits.children[2].reset(2900,279);
			pits.children[2].height = 200;
			
			tubes.children[1].reset(3210,game.height/1.9);
			
			enemies.children[3].reset(3340,game.height/1.65);
			enemies.children[3].vel = 100;
			
			steps1.children[1].reset(3420,game.height/1.55);
			steps2.children[1].reset(3450,game.height/1.64);
			
			pits.children[3].reset(3560,279);
			pits.children[3].height = 200;
			
			tubes.children[2].reset(3810,game.height/1.9);
			
			enemies.children[4].reset(3940,game.height/1.65);
			enemies.children[4].vel = 100;
			
			tubes.children[3].reset(4010,game.height/1.9);
			
			treasureBrick.children[5].reset(4230, game.height/2.65);
			treasureBrick.children[5].traversed = 4;
			treasureBrick.children[5].edgeLeft = true;
			rock.children[16].reset(4270, game.height/2.65);
			rock.children[16].reset(4310, game.height/2.65);
			treasureBrick.children[6].reset(4350, game.height/2.65);
			treasureBrick.children[6].traversed = 4;
			treasureBrick.children[6].edgeRight = true;
			
			coins.children[3].reset(4500,game.height/1.9);
			coins.children[3].animations.add('spin',[0,1,2,3],10,true);
			
			rock.children[17].reset(4570, game.height/2.65);
			rock.children[17].edgeLeft = true;
			rock.children[17].edgeRight = true;
			
			coins.children[4].reset(4660,100);
			coins.children[4].animations.add('spin',[0,1,2,3],10,true);
			
			rock.children[18].reset(4770, game.height/2.65);
			rock.children[18].edgeLeft = true;
			rock.children[18].edgeRight = true;
			
			coins.children[5].reset(4820,100);
			coins.children[5].animations.add('spin',[0,1,2,3],10,true);
			
			rock.children[18].reset(5100, game.height/2.65);
			rock.children[18].edgeLeft = true;
			rock.children[19].reset(5140, game.height/2.65);
			treasureBrick.children[7].reset(5180, game.height/2.65);
			treasureBrick.children[7].traversed = 4;
			treasureBrick.children[7].edgeRight = true;
			
			pits.children[4].reset(5320,279);
			pits.children[4].height = 200;
			
			rock.children[20].reset(5500, game.height/2.65);
			rock.children[20].edgeLeft = true;
			rock.children[21].reset(5540, game.height/2.65);
			treasureBrick.children[8].reset(5580, game.height/2.65);
			treasureBrick.children[8].traversed = 4;
			treasureBrick.children[8].edgeRight = true;
			
			tubes.children[4].reset(5710,game.height/1.9);
			
			enemies.children[5].reset(5840,game.height/1.65);
			enemies.children[5].vel = 100;
			
			coins.children[6].reset(5760,100);
			coins.children[6].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[7].reset(5800,100);
			coins.children[7].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[8].reset(5840,100);
			coins.children[8].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[9].reset(5780,150);
			coins.children[9].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[10].reset(5820,150);
			coins.children[10].animations.add('spin',[0,1,2,3],10,true);
			
			pits.children[5].reset(6100,279);
			pits.children[5].height = 200;
			
			treasureBrick.children[9].reset(6280, game.height/2.65);
			treasureBrick.children[9].traversed = false;
			treasureBrick.children[9].power = 1;
			treasureBrick.children[9].edgeLeft = true;
			treasureBrick.children[10].reset(6320, game.height/2.65);
			treasureBrick.children[10].traversed = 4;
			treasureBrick.children[11].reset(6360, game.height/2.65);
			treasureBrick.children[11].traversed = 4;
			treasureBrick.children[11].edgeRight = true;
			
			enemies.children[6].reset(6240,game.height/1.65);
			enemies.children[6].vel = 100;
			
			rock.children[22].reset(6480, game.height/2.65);
			rock.children[22].edgeLeft = true;
			rock.children[23].reset(6520, game.height/2.65);
			rock.children[24].reset(6560, game.height/2.65);
			rock.children[25].reset(6600, game.height/2.65);
			rock.children[25].edgeRight = true;
			
			treasureBrick.children[12].reset(6480, game.height/6);
			treasureBrick.children[12].traversed = 4;
			treasureBrick.children[12],edgeLeft = true;
			rock.children[26].reset(6520, game.height/6);
			rock.children[27].reset(6560, game.height/6);
			treasureBrick.children[13].reset(6600, game.height/6);
			treasureBrick.children[13].traversed = 4;
			treasureBrick.children[13].edgeRight = true;
			
			enemies.children[7].reset(6740,game.height/1.65);
			enemies.children[7].vel = 100;
			
			tubes.children[5].reset(6820,game.height/1.9);
			
			enemies.children[8].reset(6900,game.height/1.65);
			enemies.children[8].vel = 100;
			
			steps1.children[2].reset(7120,game.height/1.55);
			steps2.children[2].reset(7150,game.height/1.64);
			
			pits.children[6].reset(7300,279);
			pits.children[6].height = 200;
			
			coins.children[11].reset(7330,150);
			coins.children[11].animations.add('spin',[0,1,2,3],10,true);
			
			rock.children[26].reset(7390, game.height/2.65);
			rock.children[26].edgeLeft = true;
			rock.children[27].reset(7430, game.height/2.65);
			rock.children[28].reset(7470, game.height/2.65);
			rock.children[29].reset(7510, game.height/2.65);
			rock.children[29].edgeRight = true;
			
			coins.children[12].reset(7390,150);
			coins.children[12].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[13].reset(7430,150);
			coins.children[13].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[14].reset(7470,150);
			coins.children[14].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[15].reset(7510,150);
			coins.children[15].animations.add('spin',[0,1,2,3],10,true);
			
			enemies.children[9].reset(7430,game.height/1.65);
			enemies.children[9].vel = 100;
			
			pits.children[7].reset(7600,279);
			pits.children[7].height = 200;
			
			pits.children[8].reset(7750,279);
			pits.children[8].height = 200;
			
			tubes.children[6].reset(7900,game.height/1.9);
			
			coins.children[16].reset(7970,279);
			coins.children[16].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[17].reset(8010,279);
			coins.children[17].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[18].reset(8050,279);
			coins.children[18].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[19].reset(8090,279);
			coins.children[19].animations.add('spin',[0,1,2,3],10,true);
			
			tubes.children[7].reset(8200,game.height/1.9);
			
			pits.children[9].reset(8350,279);
			pits.children[9].height = 200;
			
			enemies.children[10].reset(8430,game.height/1.65);
			enemies.children[10].vel = 100;
			
			steps1.children[3].reset(8520,game.height/1.55);
			steps2.children[3].reset(8550,game.height/1.64);
			
			rock.children[30].reset(8690, game.height/2.65);
			rock.children[30].edgeLeft = true;
			rock.children[31].reset(8730, game.height/2.65);
			rock.children[32].reset(8770, game.height/2.65);
			rock.children[33].reset(8810, game.height/2.65);
			treasureBrick.children[14].reset(8850, game.height/6);
			treasureBrick.children[14].traversed = 4;
			treasureBrick.children[14].edgeRight = true;
			
			coins.children[20].reset(8910,279);
			coins.children[20].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[21].reset(8950,279);
			coins.children[21].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[22].reset(8990,279);
			coins.children[22].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[23].reset(9030,279);
			coins.children[23].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[24].reset(9150,150);
			coins.children[24].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[25].reset(9190,150);
			coins.children[25].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[26].reset(9230,150);
			coins.children[26].animations.add('spin',[0,1,2,3],10,true);
			
			coins.children[27].reset(9270,150);
			coins.children[27].animations.add('spin',[0,1,2,3],10,true);
			
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
			
			timerText = game.add.text(game.width/1.3,10,"Remaining Time - ",{
				font:"bold 16px Arial", fill: "red" 
			});
			timerText.fixedToCamera = true;
			 // Create a custom timer
			timer = game.time.create();
			
			// Create a delayed event 1m and 30s from now
			timerEvent = timer.add(Phaser.Timer.MINUTE * 2 + Phaser.Timer.SECOND * 0, this.endTimer, this);
			
			// Start the timer
			timer.start();
			
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
			if (timer.running) {
				timerText.text = "Remaining Time - " + this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
				// game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0");
			}
			else {
				// game.debug.text("Done!", 2, 14, "#0f0");
			}
			updateFunctions();
		},
		
		endTimer: function() {
			// Stop the timer when the delayed event triggers
			timer.stop();
			timerEnd = 1;
			currLevel = 1;
			checkLives();
		},
		formatTime: function(s) {
			// Convert seconds (s) to a nicely formatted and padded time string
			var minutes = "0" + Math.floor(s / 60);
			var seconds = "0" + (s - minutes * 60);
			return minutes.substr(-2) + ":" + seconds.substr(-2);   
		}
	}
	
	