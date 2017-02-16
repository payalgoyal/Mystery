	var levelButtons = [];
	
	var levels = function(game){}
// Creates a new 'main' state that will contain the game
   levels.prototype = {
		// Function called first to load all the assets
		preload: function() { 
			// Change the background color of the game	

			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("levelsBg", "images/levelsBg.png");
			game.load.image("levelsLand", "images/levelLand.png");
			game.load.image("ocean", "images/ocean.jpg");
			game.load.image("boat", "images/boat.png");
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			game.load.spritesheet("rightSprite", "images/dude.png",32,48);
			
		},

		// Fuction called after 'preload' to setup the game 
		create: function() { 
			ocean = game.add.sprite(0,0,'ocean');
			ocean.width = game.width;
			ocean.height = game.height;
			levelButtons[0] = game.add.button(150,100,"levelsLand");
			
			levelButtons[0].onInputDown.add(levelNo1);
			
			levelCompleted = localStorage.getItem("levelCompleted")==null?1:localStorage.getItem("levelCompleted");
			
			levelButtons[1] = game.add.button(250,100,"levelsLand");
			
			levelButtons[1].onInputDown.add(levelNo2);
			
			for (var land=0;land<levelButtons.length;land++){
				levelButtons[land].width = 70;
				levelButtons[land].height = 50;	
				textOnButton = game.add.text(levelButtons[land].x+levelButtons[land].width/3,levelButtons[land].y+levelButtons[land].height/3,land+1,{
					font:"bold 16px Arial", fill: "white" 
				});
			}
			
			for (var i = 0;i< levelCompleted;i++){
				levelButtons[i].inputEnabled = true;
			}
			for (var j = levelCompleted;j< levelButtons.length;j++){
				levelButtons[j].inputEnabled = false;
			}
			
			boat = game.add.sprite(levelButtons[levelCompleted-1].x+40,levelButtons[levelCompleted-1].y+20,'boat');
			boat.width = 40;
			boat.height = 40;
			
		},

		// This function is called 60 times per second
		update: function() {
			// upButton.onInputDown.add(openLevel);
			
		}
   }
   
	function levelNo1(){
		playAudio("levelClicked");
		game.state.add("LevelDesign1",levelDesign1);
		game.state.start("LevelDesign1");
	}
	
	function levelNo2(){
		playAudio("levelClicked");
		game.state.add("LevelDesign2",levelDesign2);
		game.state.start("LevelDesign2");
	}
   
   