var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth/innerHeight;	
var game = new Phaser.Game(Math.ceil(480*gameRatio), 480, Phaser.AUTO);

var remLives = 3;

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
			
			game.load.image("titleBg", "images/mystery_bg.png");
			
			game.load.image("sevenHuesTitle", "images/sevenHuesTitle.png");
			
			game.load.image("titleTry", "images/titleTry.png");
			
			game.load.spritesheet("mysterySprite", "images/mysterySprite2.png",550,187);
			
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			
			game.load.spritesheet("rightSprite", "images/playerSprite.png",32,48);
			
			game.load.image("witch", "images/witch.png");
			game.load.image("heart", "images/lives.png");
			game.load.image("pit", "images/pit.png");			
		},
		create: function() { 
			sevenHuesTitle = game.add.sprite(0,0,'sevenHuesTitle');
			sevenHuesTitle.width = game.width;
			sevenHuesTitle.height = game.height;
			
			mysteryTitle = 0;
			
			setTimeout(function(){
				mysteryTitle = 1;
				titleTry = game.add.sprite(0,0,'titleTry');
				titleTry.width = game.width;
				titleTry.height = game.height;
				
				mysterySprite = game.add.sprite(game.width/2.37,game.height/1.34,'mysterySprite');
				mysterySprite.width = (game.width*550)/1920;
				mysterySprite.height = (game.height*187)/1080;
				mysterySprite.frame=0;
				
				mysterySprite.animations.add('changeColor',[0,1,2,3],7,true);
				
				startText = game.add.text(game.width/3.5,game.height/3.5,"Tap Anywhere To Start",{
					font:"bold 30px Algerian", fill: "#ff88bb" 
				});
				
				menuScreen();
			}, 1500)			
		},
		update: function() {
			if (mysteryTitle == 1){
				mysterySprite.animations.play("changeColor");
			}
		}
	}
	
game.state.add("Main",main);
game.state.start("Main");

 function startGame() {
	game.state.add("Stage1Levels",stage1Levels);
	game.state.start("Stage1Levels");
 }
 
 function menuScreen() {
		
		game.input.onDown.add(startGame, this);
 }
