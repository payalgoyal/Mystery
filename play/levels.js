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
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			game.load.spritesheet("rightSprite", "images/dude.png",32,48);
			
			game.load.audio('levelClick', 'sounds/levelClick.mp3');
			
		},

		// Fuction called after 'preload' to setup the game 
		create: function() { 
			levelClick = game.add.audio('levelClick');
		
			levelButtons[0] = game.add.button(150,100,"levelsBg");
			textOnButton = game.add.text(levelButtons[0].x+levelButtons[0].width/3,levelButtons[0].y+levelButtons[0].height/3,1,{
				font:"bold 16px Arial", fill: "white" 
			});
			levelButtons[0].onInputDown.add(levelNo1);
			
			levelCompleted = localStorage.getItem("levelCompleted")==null?1:localStorage.getItem("levelCompleted");
			
			levelButtons[1] = game.add.button(250,100,"levelsBg");
			textOnButton = game.add.text(levelButtons[1].x+levelButtons[1].width/3,levelButtons[1].y+levelButtons[1].height/3,2,{
				font:"bold 16px Arial", fill: "white" 
			});
			levelButtons[1].onInputDown.add(levelNo2);
			
			for (var i = 0;i< maxLevel;i++){
				levelButtons[i].inputEnabled = true;
			}
			for (var j = maxLevel;j< levelButtons.length;j++){
				levelButtons[j].inputEnabled = false;
			}
			
		},

		// This function is called 60 times per second
		update: function() {
			// upButton.onInputDown.add(openLevel);
			
		}
   }
   
	function levelNo1(){
		levelClick.play();
		game.state.add("LevelDesign1",levelDesign1);
		game.state.start("LevelDesign1");
	}
	
	function levelNo2(){
		levelClick.play();
		game.state.add("LevelDesign2",levelDesign2);
		game.state.start("LevelDesign2");
	}
   
   