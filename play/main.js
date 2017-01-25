var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth/innerHeight;	
var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO);

var main = function(game){}
	main.prototype = {
		preload: function() { 
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			game.load.image("cloud", "images/layer-6_small.png");
			game.load.image("sky", "images/layer-1_small.png");
			
			game.load.image("grass", "images/grass.png");
			game.load.image("ground", "images/ground4.jpg");
			game.load.image("fence", "images/fence2.png");
			
			game.load.image("lowerSteps", "images/lower_steps.png");
			game.load.image("steps2", "images/steps2.png");
			game.load.image("steps3", "images/steps3.png");
			
			game.load.image("wall", "images/wall.png");
			game.load.image("tube", "images/tubeTank.png");
			game.load.image("breakingBrick", "images/breakingBrick.png");
			game.load.image("energyBottle", "images/energyBottle.png");
			
			game.load.image("nextLevel", "images/nextLevel.png");
			game.load.image("rightArrow", "images/rightArrow.png");
			game.load.image("leftArrow", "images/leftArrow.png");
			game.load.image("upArrow", "images/upArrow.png");
			game.load.image("rock", "images/rock.jpg");
			
			game.load.image("villian", "images/enemy.png");
			game.load.image("enemyDie", "images/enemy_die.png");
			game.load.image("underground", "images/underground.png");
			
			game.load.image("treasureBrick", "images/treasureBrick.jpg");
			
			game.load.image("targetBox", "images/targetBox.png");
			game.load.image("princess", "images/princessTrapped.png");
			
			game.load.spritesheet("enemiesSprite", "images/enemiesSpritesheet.png");
			
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			
			game.load.spritesheet("rightSprite", "images/playerSprite.png",32,48);
		
			game.load.audio('jump', 'sounds/jump.mp3');
			game.load.audio('run', 'sounds/walk1.ogg');
			game.load.audio('brickBreaking', 'sounds/brickBreaking.mp3');
			game.load.audio('coinCollect', 'sounds/coinCollect.mp3');
			game.load.audio('energy', 'sounds/energy.mp3');
			game.load.audio('treasureHit', 'sounds/treasureHit.mp3');
			game.load.audio('enemyKill', 'sounds/enemyKilled.mp3');
		},
		create: function() { 
			sky = game.add.tileSprite(0,0,game.width,game.height,'sky');
			cloud = game.add.tileSprite(0, 0,game.width,500, 'cloud');
			
			ground = game.add.tileSprite(0, game.height/1.5,game.width,400, 'ground');
			
			fence = game.add.tileSprite(0,279,10000,45,"fence");
			grass = game.add.tileSprite(0, game.height/1.55, 10000, 15, "grass");
			
			tubes = game.add.sprite(730,game.height/1.9,'tube');
			
			rock = game.add.sprite(game.width/3, game.height/2.65,'rock');
			rock = game.add.sprite(game.width/3+30, game.height/2.65,'rock');
			rock = game.add.sprite(game.width/3+60, game.height/2.65,'rock');
			
			mysprite=game.add.sprite(game.width/6,game.height/1.75,'rightSprite');
			mysprite.frame=4;
			
			gameTitleText = game.add.text(game.width/4.5,game.height/4.5,"JOURNEY TO MYSTERY LAND",{
				font:"bold 26px Arial", fill: "red" 
			});
			
			startText = game.add.text(game.width/2.5,game.height/2.5,"Tap To Start",{
				font:"bold 26px Arial", fill: "red" 
			});
			
			villian1 = game.add.sprite(300, 340, 'villian');
			
			//game.input.onDown.add(startGame, this);
			
			menuScreen();
			
		},
		update: function() {
			
		}
	}
	
game.state.add("Main",main);
game.state.start("Main");

 function startGame() {
	game.state.add("Levels",levels);
	game.state.start("Levels");
 }
 
 function menuScreen() {
		
		game.input.onDown.add(startGame, this);
 }
