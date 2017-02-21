	var levelButtons = [];
	
	var stage1Levels = function(game){}
// Creates a new 'main' state that will contain the game
   stage1Levels.prototype = {
		// Function called first to load all the assets
		preload: function() { 
			// Change the background color of the game	

			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.setScreenSize(true);
			
			game.load.image("levelsBg", "images/levelsBg.png");
			game.load.image("levelsLand", "images/levelLand.png");
			game.load.image("ocean", "images/ocean.jpg");
			game.load.image("boat", "images/boat.png");
			game.load.image("lock", "images/lock.png");
			game.load.spritesheet("coinsSprite", "images/coinSprite.png",40,39);
			
		},

		// Function called after 'preload' to setup the game 
		create: function() { 
			currStage = 1;
			ocean = game.add.sprite(0,0,'ocean');
			ocean.width = game.width;
			ocean.height = game.height;
			
			stageText = game.add.text(game.width/2.5,20,"Stage 1",{
					font:"bold 28px Arial", fill: "red" 
				});
			levelCompletedStage1 = localStorage.getItem("levelCompletedStage1")==null?1:localStorage.getItem("levelCompletedStage1");
			
			levelButtons[0] = game.add.button(game.width/4.5,140,"levelsLand");
			levelButtons[0].onInputDown.add(levelNo1);
			
			levelButtons[1] = game.add.button(game.width/2.9,100,"levelsLand");
			levelButtons[1].onInputDown.add(levelNo2);
			
			levelButtons[2] = game.add.button(game.width/1.95,100,"levelsLand");
			levelButtons[2].onInputDown.add(levelNo3);
			
			levelButtons[3] = game.add.button(game.width/1.5,140,"levelsLand");
			levelButtons[3].onInputDown.add(levelNo4);
			
			levelButtons[4] = game.add.button(game.width/3.1,220,"levelsLand");
			levelButtons[4].onInputDown.add(levelNo5);
			
			levelButtons[5] = game.add.button(game.width/2.3,180,"levelsLand");
			levelButtons[5].onInputDown.add(levelNo6);
			
			levelButtons[6] = game.add.button(game.width/1.8,220,"levelsLand");
			levelButtons[6].onInputDown.add(levelNo7);
			
			levelButtons[7] = game.add.button(game.width/2.2,300,"levelsLand");
			levelButtons[7].onInputDown.add(levelNo8);
			
			for (var land=0;land<levelButtons.length;land++){
				levelButtons[land].width = 70;
				levelButtons[land].height = 50;	
				textOnButton = game.add.text(levelButtons[land].x+levelButtons[land].width/3,levelButtons[land].y+levelButtons[land].height/3,land+1,{
					font:"bold 16px Arial", fill: "white" 
				});
			}
			
			for (var i = 0;i< levelCompletedStage1;i++){
				levelButtons[i].inputEnabled = true;
			}
			for (var j = levelCompletedStage1;j< levelButtons.length;j++){
				levelButtons[j].inputEnabled = false;
				lock = game.add.sprite(levelButtons[j].x+20,levelButtons[j].y+5,'lock');
				lock.width = 30;
				lock.height = 30
			}
			
			boat = game.add.sprite(levelButtons[levelCompletedStage1-1].x+40,levelButtons[levelCompletedStage1-1].y+20,'boat');
			boat.width = 40;
			boat.height = 40;
			
			nextStageButton = game.add.button(game.camera.view.width-100,game.camera.view.height/2,'rightArrow');
			nextStageButton.onInputDown.add(nextStageChange);
			
		},

		// This function is called 60 times per second
		update: function() {
			// upButton.onInputDown.add(openLevel);
			
		}
   }
   
	function levelNo1(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign1",stage1LevelDesign1);
		game.state.start("Stage1LevelDesign1");
	}
	
	function levelNo2(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign2",stage1LevelDesign2);
		game.state.start("Stage1LevelDesign2");
	}
	
	function levelNo3(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign3",stage1LevelDesign3);
		game.state.start("Stage1LevelDesign3");
	}
	
	function levelNo4(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign4",stage1LevelDesign4);
		game.state.start("Stage1LevelDesign4");
	}
	
	function levelNo5(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign5",stage1LevelDesign5);
		game.state.start("Stage1LevelDesign5");
	}
	
	function levelNo6(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign6",stage1LevelDesign6);
		game.state.start("Stage1LevelDesign6");
	}
	
	function levelNo7(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign7",stage1LevelDesign7);
		game.state.start("Stage1LevelDesign7");
	}
	
	function levelNo8(){
		playAudio("levelClicked");
		game.state.add("Stage1LevelDesign8",stage1LevelDesign8);
		game.state.start("Stage1LevelDesign8");
	}
	
	function nextStageChange(){
		currStage = currStage+1;
		game.state.add("Stage2Levels",stage2Levels);
		game.state.start("Stage2Levels");
	}
   
   