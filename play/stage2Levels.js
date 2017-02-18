	var stage2LevelButtons = [];
	
	var stage2Levels = function(game){}
// Creates a new 'main' state that will contain the game
   stage2Levels.prototype = {
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

		// Function called after 'preload' to setup the game 
		create: function() { 
			currStage = 2;
			ocean = game.add.sprite(0,0,'ocean');
			ocean.width = game.width;
			ocean.height = game.height;
			
			stageText = game.add.text(game.width/2.5,20,"Stage 2",{
					font:"bold 28px Arial", fill: "red" 
				});
			
			stage2LevelButtons[0] = game.add.button(game.width/3.5,100,"levelsLand");
			
			stage2LevelButtons[0].onInputDown.add(stage2LevelNo1);
			
			levelCompletedStage2 = localStorage.getItem("levelCompletedStage2")==null?1:localStorage.getItem("levelCompletedStage2");
			
			stage2LevelButtons[1] = game.add.button(game.width/2.5,100,"levelsLand");
			
			stage2LevelButtons[1].onInputDown.add(stage2LevelNo2);
			
			stage2LevelButtons[2] = game.add.button(game.width/1.9,100,"levelsLand");
			
			stage2LevelButtons[2].onInputDown.add(stage2LevelNo3);
			
			stage2LevelButtons[3] = game.add.button(game.width/2.9,200,"levelsLand");
			
			stage2LevelButtons[3].onInputDown.add(stage2LevelNo4);
			
			stage2LevelButtons[4] = game.add.button(game.width/2.1,200,"levelsLand");
			
			stage2LevelButtons[4].onInputDown.add(stage2LevelNo5);
			
			for (var land=0;land<stage2LevelButtons.length;land++){
				stage2LevelButtons[land].width = 70;
				stage2LevelButtons[land].height = 50;	
				textOnButton = game.add.text(stage2LevelButtons[land].x+stage2LevelButtons[land].width/3,stage2LevelButtons[land].y+stage2LevelButtons[land].height/3,land+1,{
					font:"bold 16px Arial", fill: "white" 
				});
			}
			
			for (var i = 0;i< levelCompletedStage2;i++){
				stage2LevelButtons[i].inputEnabled = true;
			}
			for (var j = levelCompletedStage2;j< stage2LevelButtons.length;j++){
				stage2LevelButtons[j].inputEnabled = false;
			}
			
			boat = game.add.sprite(stage2LevelButtons[levelCompletedStage2-1].x+40,stage2LevelButtons[levelCompletedStage2-1].y+20,'boat');
			boat.width = 40;
			boat.height = 40;
			
			prevStageButton = game.add.button(100,game.camera.view.height/2,'leftArrow');
			prevStageButton.onInputDown.add(prevStageChange);
			
		},

		// This function is called 60 times per second
		update: function() {
			// upButton.onInputDown.add(openLevel);
			
		}
   }
   
	function stage2LevelNo1(){
		// playAudio("levelClicked");
		game.state.add("Stage2LevelDesign1",stage2LevelDesign1);
		game.state.start("Stage2LevelDesign1");
	}
	
	function stage2LevelNo2(){
		// playAudio("levelClicked");
		game.state.add("Stage2LevelDesign2",stage2LevelDesign2);
		game.state.start("Stage2LevelDesign2");
	}
	
	function stage2LevelNo3(){
		// playAudio("levelClicked");
		game.state.add("Stage2LevelDesign3",stage2LevelDesign3);
		game.state.start("Stage2LevelDesign3");
	}
	
	function stage2LevelNo4(){
		// playAudio("levelClicked");
		game.state.add("Stage2LevelDesign4",stage2LevelDesign4);
		game.state.start("Stage2LevelDesign4");
	}
	
	function stage2LevelNo5(){
		// playAudio("levelClicked");
		game.state.add("Stage2LevelDesign5",stage2LevelDesign5);
		game.state.start("Stage2LevelDesign5");
	}
	
	function prevStageChange(){
		currStage = currStage-1;
		game.state.add("Stage1Levels",stage1Levels);
		game.state.start("Stage1Levels");
	}
	
   